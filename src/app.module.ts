import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ResponseTimeMiddleware } from './middleware/response-time.middleware';
import { HttpCacheInterceptor } from './redis/http-cache.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';


import { ConfigModule } from '@nestjs/config';
import { PhotosModule } from './vehicle-photo/vehicle-photo.module';
import { PostsModule } from './posts/posts.module';
import { TransportCategoriesModule } from './transport-category/transport-category.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts/entities/posts.entity';
import { VehiclePhoto } from './vehicle-photo/entities/vehicle-photo.entity';
import { TransportCategory } from './transport-category/entities/transport-category.entity';
import { Brand } from './brands/entities/brands.entity';
import { Photographer } from './photographer/entities/photographer.entity';
import { VehicleModule } from './vehicle/vehicle.module';
import { CompaniesModule } from './company/company.module';
import { BrandsModule } from './brands/brands.module';
import { CountriesModule } from './country/country.module';
import { Vehicle } from './vehicle/entities/vehicle.entity';
import { CompanyEntiti } from './company/entities/company.entity';
import { Country } from './country/entities/country.entity';
import { CompanySerialEntiti } from './company/entities/company-serial.entity';
import { CompanyServiceEntiti } from './company/entities/company-service.entity';
import { Model } from './vehicle-model/entities/vehicle-model.entity';
import { Chassis } from './vehicle/entities/chassis.entity';
import { Bodywork } from './vehicle/entities/bodyworks.entity';
import { VehicleType } from './vehicle-type/entities/vehicle-type.entity';
import { VehicleModelModule } from './vehicle-model/vehicle-model.module';
import { PhotographerModule } from './photographer/photographer.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';
import { RedisModule } from './redis/redis.module';
import { SearchModule } from './search/search.module';


@Module({
  imports: [   
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RedisModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      //url: process.env.DATABASE_PUBLIC_URL || undefined, // solo si usas Railway/Supabase
      host: process.env.DB_HOST || '172.18.0.5',
      port: Number(process.env.DB_PORT) || 5433,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'example',
      database: process.env.PGDATABASE || 'postgres',
      entities: [
        Posts,
        VehiclePhoto,
        TransportCategory,
        Vehicle,
        Brand,
        CompanyEntiti,
        Photographer,
        Country,
        Bodywork,
        Chassis,
        CompanySerialEntiti,
        CompanyServiceEntiti,
        Model,
        VehicleType,
      ],
      synchronize: false,
      migrationsRun: true,
      migrations: ['dist/migrations/*.ts'],
      ssl:
        process.env.NODE_ENV === 'production'
          ? { rejectUnauthorized: false } // Railway/Supabase/Heroku
          : false, // Local / Docker
    }),
    PhotosModule,
    PostsModule,
    TransportCategoriesModule,
    ContactModule,
    AuthModule,
    UsersModule,
    VehicleModule,
    CompaniesModule,
    BrandsModule,
    CountriesModule,
    VehicleModelModule,
    PhotographerModule,
    VehicleTypeModule,
    SearchModule
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
