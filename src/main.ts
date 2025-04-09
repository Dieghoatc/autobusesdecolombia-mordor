import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://www.autobusesdecolombia.com'], // agrega tu dominio aquí
    credentials: true,
  });

  app.use(cookieParser());

  const port = parseInt(process.env.PORT, 10) || 3001;
  await app.listen(port);
  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
