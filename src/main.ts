import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe, Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  try {
    const app = await NestFactory.create(AppModule);

    app.use(cookieParser());

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    const origins = process.env.CORS_ORIGIN?.split(',').map((origin) =>
      origin.trim(),
    ) || ['http://localhost:3000', 'http://localhost:3001'];
    
    const environment = process.env.NODE_ENV || 'development';

    app.enableCors({
      origin: origins,
      credentials: true,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Accept',
        'Authorization',
        'X-Requested-With',
        'Origin',
      ],
    });

    const portEnv = process.env.PORT;
    const port =
      portEnv && !isNaN(parseInt(portEnv, 10)) ? parseInt(portEnv, 10) : 3001;

    await app.listen(port);

    logger.log(`🚀 Server running on http://localhost:${port}`);
    logger.log(`📝 Environment: ${environment}`);
    logger.log(`🌐 CORS origins: ${origins.join(', ')}`);
  } catch (error) {
    logger.error('❌ Error starting the application:', error);
    process.exit(1);
  }
}

bootstrap();
