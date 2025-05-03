import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ResponseTimeMiddleware } from './middleware/response-time.middleware';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { PostsModule } from './posts/posts.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/post.entity'; // Importamos la clase Post

@Module({
  imports: [
    PhotosModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL_PUBLIC, // Usamos una variable de entorno
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Posts],
      synchronize: true,
      migrations: ['dist/migrations/**/*.js'],
      ssl: {
        rejectUnauthorized: false, // Necesario para conexiones SSL en Railway
      },
    }),
    PostsModule,
    ContactModule,
    AuthModule,
    UsersModule,
  ],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
