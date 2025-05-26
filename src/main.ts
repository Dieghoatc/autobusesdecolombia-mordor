import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origins = process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:3000',
  ];
  const environment = process.env.NODE_ENV || 'development';

  app.useGlobalPipes(new ValidationPipe());

  if (environment === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: origins,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: [
        'Content-Type',
        'Accept',
        'Authorization',
        'X-Requested-With',
        'Access-Control-Allow-Credentials',
        'Access-Control-Allow-Origin',
      ],
    });
  }

  app.use(cookieParser());

  const port = parseInt(process.env.PORT, 10) || 3001;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
