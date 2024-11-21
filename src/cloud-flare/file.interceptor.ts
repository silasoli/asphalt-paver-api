// file.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Type,
  mixin,
} from '@nestjs/common';
import Busboy from 'busboy';
import { Observable } from 'rxjs';

export function FileInterceptor2(): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest();

      if (!request.is('multipart/*')) return next.handle();

      const busboy = Busboy({ headers: request.headers });
      const fields = {};
      const files = [];

      return new Promise((resolve, reject) => {
        busboy.on(
          'file',
          (fieldname, file, { filename: originalName, encoding, mimeType }) => {
            const fileInfo = { fieldname, originalName, encoding, mimeType };
            const buffer = [];
            file
              .on('error', reject)
              .on('data', (data) => buffer.push(data))
              .on('close', () => {
                fileInfo['buffer'] = Buffer.concat(buffer);
                fileInfo['size'] = fileInfo['buffer'].length;
                files.push(fileInfo);
              });
          },
        );
        busboy.on('field', (name, val) => (fields[name] = val));
        busboy.on('error', reject);
        busboy.on('close', () => {
          request.body = fields;
          request.file = files[0];
          request.files = files;
          resolve(next.handle());
        });

        if (process.env.FIREBASE_CONFIG) {
          busboy.end(request.rawBody);
        } else {
          request.pipe(busboy);
        }
      });
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}
