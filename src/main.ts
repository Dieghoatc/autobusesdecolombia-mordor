import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'https://www.autobusesdecolombia.com',  // Dominio de producción
      'http://localhost:3000',               // Frontend de Next.js en localhost
      'http://localhost:4200',               // Frontend de Angular en localhost
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Accept, x-requested-with',  // Encabezados permitidos
  });

  app.use(cookieParser());

  const port = parseInt(process.env.PORT, 10) || 3001;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
