import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ResponseTimeMiddleware } from './middleware/response-time.middleware';
import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './photos/photos.module';
import { PostsModule } from './posts/posts.module';
import { TransportCategoriesModule } from './transport-categories/transport-categories.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/post.entity'; // Importamos la clase Post
import { Photo2 } from './photos/entities/photos.entity';
import { TransportCategory } from './transport-categories/entities/transport-category.entity';
import { Vehicle } from './photos/entities/vehicles.entity';
import { Brand } from './photos/entities/brands.entity';
import { Company } from './photos/entities/companies.entity';
import { Photographer } from './photos/entities/photographers.entity';
import { Country } from './photos/entities/countries.entity';
import { Bodywork } from './photos/entities/bodyworks.entity';
import { Chassis } from './photos/entities/chassis.entity';
import { Serial } from './photos/entities/serials.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_PUBLIC_URL, // Usamos una variable de entorno
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.PGDATABASE,
      entities: [Posts, Photo2, TransportCategory, Vehicle, Brand, Company, Photographer, Country, Bodywork, Chassis, Serial, TransportCategory],
      synchronize: false,
      migrationsRun: true,
      migrations: ['dist/migrations/*.ts'],
      ssl: {
        rejectUnauthorized: false, // Necesario para conexiones SSL en Railway
      },
    }),
    PhotosModule,
    PostsModule,
    TransportCategoriesModule,
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
