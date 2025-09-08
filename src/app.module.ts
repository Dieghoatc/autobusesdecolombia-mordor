import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ResponseTimeMiddleware } from './middleware/response-time.middleware';
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
import { Company } from './company/entities/company.entity';
import { Country } from './country/entities/country.entity';
import { CompanySerial } from './company/entities/company-serial.entity';
import { CompanyService } from './company/entities/company-service.entity';
import { Model } from './vehicle-model/entities/vehicle-model.entity';
import { Chassis } from './vehicle/entities/chassis.entity';
import { Bodywork } from './vehicle/entities/bodyworks.entity';
import { VehicleType } from './vehicle-type/entities/vehicle-type.entity';
import { VehicleModelModule } from './vehicle-model/vehicle-model.module';
import { PhotographerModule } from './photographer/photographer.module';
import { VehicleTypeModule } from './vehicle-type/vehicle-type.module';

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
      entities: [
        Posts,
        VehiclePhoto,
        TransportCategory,
        Vehicle,
        Brand,
        Company,
        Photographer,
        Country,
        Bodywork,
        Chassis,
        CompanySerial,
        CompanyService,
        Model,
        VehicleType,
      ],
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
    VehicleModule,
    CompaniesModule,
    BrandsModule,
    CountriesModule,
    VehicleModelModule,
    PhotographerModule,
    VehicleTypeModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
