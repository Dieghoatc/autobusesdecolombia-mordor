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
import { Photo } from './photos/entities/photos.entity';
import { TransportCategory } from './transport-categories/entities/transport-category.entity';
import { Brand } from './brands/entities/brands.entity';
import { Photographers } from './photos/entities/photographers.entity';
import { VehicleModule } from './vehicle/vehicle.module';
import { CompaniesModule } from './companies/companies.module';
import { BrandsModule } from './brands/brands.module';
import { CountriesModule } from './countries/countries.module';
import { Vehicles } from './vehicle/entities/vehicle.entity';
import { Companies } from './companies/entities/companies.entity';
import { Countries } from './countries/entities/countries.entity';
import { CompanySerials } from './companies/entities/company_serials.entity';
import { CompanyServices } from './companies/entities/company_services.entity';
import { Models } from './vehicle/entities/vehicle-models.entity';
import { Chassis } from './vehicle/entities/chassis.entity';
import { Bodywork } from './vehicle/entities/bodyworks.entity';
import { VehicleType } from './vehicle/entities/vehicle-type.entity';

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
        Photo,
        TransportCategory,
        Vehicles,
        Brand,
        Companies,
        Photographers,
        Countries,
        Bodywork,
        Chassis,
        CompanySerials,
        CompanyServices,
        Models,
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
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResponseTimeMiddleware).forRoutes('*'); // Aplica el middleware a todas las rutas
  }
}
