import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { COMMON_ERRORS } from '../constants/common.errors';

@Injectable()
export class HashAuthInterceptor implements NestInterceptor {
  private readonly validHash = process.env.TOKEN;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer '))
      throw COMMON_ERRORS.AUTH.INVALID_CREDENTIALS;

    const token = authHeader.split(' ')[1];

    if (token !== this.validHash) throw COMMON_ERRORS.AUTH.INVALID_CREDENTIALS;

    return next.handle();
  }
}
