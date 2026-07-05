import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"
import { ValidationPipe, Logger } from "@nestjs/common"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"
import { apiReference } from "@scalar/nestjs-api-reference"

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

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Autobuses de Colombia API')
      .setDescription(
        'Public API to browse vehicles, brands, companies, photos and transport categories for autobusesdecolombia.com',
      )
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token issued by /users/login',
        },
        'access_token',
      )
      .addTag('auth', 'Session verification')
      .addTag('users', 'Register, login and user profile')
      .addTag('vehicles', 'Vehicle catalog')
      .addTag('vehicle-photos', 'Vehicle photos')
      .addTag('vehicle-models', 'Vehicle models')
      .addTag('vehicle-types', 'Vehicle types')
      .addTag('transport-categories', 'Transport categories')
      .addTag('company', 'Transport companies')
      .addTag('photographers', 'Photographers')
      .addTag('posts', 'Blog / posts')
      .addTag('contact', 'Contact form')
      .addTag('search', 'General search')
      .addTag('cache', 'Cache utilities (Redis)')
      .addServer('http://localhost:3001', 'Local')
      .addServer('https://api.autobusesdecolombia.com', 'Production')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);

    app.use(
      '/docs',
      apiReference({
        content: document,
        theme: 'purple',
        pageTitle: 'Autobuses de Colombia API — Docs',
      }),
    );

    const portEnv = process.env.PORT;
    const port =
      portEnv && !isNaN(parseInt(portEnv, 10)) ? parseInt(portEnv, 10) : 3001;

    app.listen(port, '::', () => {
      console.log(`Server listening on ${port}`);
    });

    logger.log(`🚀 Server running on port:${port}`);
    logger.log(`📝 Environment: ${environment}`);
    logger.log(`📚 API docs available at /docs`);
  } catch (error) {
    logger.error('❌ Error starting the application:', error);
    process.exit(1);
  }
}

bootstrap();
