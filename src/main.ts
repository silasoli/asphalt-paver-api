import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/exception-filters/http-exception.filter';
import { TypeORMExceptionFilter } from './common/exception-filters/typeorm-exception.filter';
import { EntityNotFoundExceptionFilter } from './common/exception-filters/entity-not-found-exception.filter';
import { HashAuthInterceptor } from './common/interceptors/hash-auth.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
  });

  const configService = app.get(ConfigService);

  // app.useGlobalPipes(
  //   new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  // );

  app.useGlobalFilters(
    new AllExceptionsFilter(),
    new TypeORMExceptionFilter(),
    new EntityNotFoundExceptionFilter(),
  );

  app.useGlobalInterceptors(new HashAuthInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Asphalt Paver API')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: '',
      docExpansion: 'none',
    },
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.js',
    ],
  });

  
  const port = configService.get('PORT');
  if (!port)
    throw new InternalServerErrorException("Application port wasn't found");

  await app.listen(port);
}
bootstrap();
