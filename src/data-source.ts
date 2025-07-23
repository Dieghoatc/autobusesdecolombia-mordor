import { DataSource } from 'typeorm';
import { Photo } from './photos/entities/photos.entity';
import { TransportCategory } from './transport-categories/entities/transport-category.entity';
import { Vehicles } from './vehicle/entities/vehicle.entity';
import { Brand } from './brands/entities/brands.entity';
import { Photographers } from './photos/entities/photographers.entity';
import { Countries } from './countries/entities/countries.entity';
import { Bodywork } from './vehicle/entities/bodyworks.entity';
import { Chassis } from './vehicle/entities/chassis.entity';
import { Companies } from './companies/entities/companies.entity';
import { CompanySerials } from './companies/entities/company_serials.entity';
import { CompanyServices } from './companies/entities/company_services.entity';
import { VehicleType } from './vehicle/entities/vehicle-type.entity';

import { Models } from './vehicle/entities/vehicle-models.entity';

import { Posts } from './posts/post.entity';

import { config } from 'dotenv';
config();

export const AppDataSource = new DataSource({
  type: 'postgres', // o "sqlite", "mysql", etc.
  url: process.env.DATABASE_PUBLIC_URL,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD, 
  database: process.env.DB_DATABASE,
  synchronize: false,
  migrationsRun: true, // ⚠️ ¡muy importante!
  dropSchema: true,
  logging: true,
  entities: [
    Posts,
    Photo,
    Photographers,
    TransportCategory,
    Vehicles,
    Models,
    Bodywork,
    Chassis,
    Brand,
    Countries,
    Companies,
    CompanySerials,
    CompanyServices,
    VehicleType,    
  ],  
  migrations: ['src/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
