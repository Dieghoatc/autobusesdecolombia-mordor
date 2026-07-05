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
        'API pública para consultar vehículos, marcas, empresas, fotos y categorías de transporte de autobusesdecolombia.com',
      )
      .setVersion('1.0.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT emitido por /users/login',
        },
        'access_token',
      )
      .addTag('auth', 'Verificación de sesión')
      .addTag('users', 'Registro, login y perfil de usuario')
      .addTag('vehicles', 'Consulta de vehículos')
      .addTag('vehicle-photos', 'Fotos de vehículos')
      .addTag('vehicle-models', 'Modelos de vehículo')
      .addTag('vehicle-types', 'Tipos de vehículo')
      .addTag('transport-categories', 'Categorías de transporte')
      .addTag('company', 'Empresas transportadoras')
      .addTag('photographers', 'Fotógrafos')
      .addTag('posts', 'Blog / posts')
      .addTag('contact', 'Formulario de contacto')
      .addTag('search', 'Búsqueda general')
      .addTag('cache', 'Utilidades de caché (Redis)')
      .addServer('http://localhost:3001', 'Local')
      .addServer('https://api.autobusesdecolombia.com', 'Producción')
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
