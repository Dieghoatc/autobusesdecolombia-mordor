import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"
import { ValidationPipe, Logger } from "@nestjs/common"

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

    const environment = process.env.NODE_ENV || 'staging';
    const origins =
      process.env.CORS_ORIGIN || 'https://www.autobusesdecolombia.com';

    app.enableCors({
      origin: environment === 'staging' ? true : origins.split(','),
      credentials: true,
      allowedHeaders: [
        'Content-Type',
        'Accept',
        'Authorization',
        'X-Requested-With',
        'Origin',
      ],
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      exposedHeaders: ['Set-Cookie'],
    });

    const portEnv = process.env.PORT;
    const port =
      portEnv && !isNaN(parseInt(portEnv, 10)) ? parseInt(portEnv, 10) : 3001;

    app.listen(port, "0.0.0.0", () => {
      console.log(`Server listening on ${port}`);
    });
    
    logger.log(`🚀 Server running on port:${port}`);
    logger.log(`📝 Environment: ${environment}`);
  } catch (error) {
    logger.error('❌ Error starting the application:', error);
    process.exit(1);
  }
}

bootstrap();
