// src/data-source.ts
import { DataSource } from 'typeorm';
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
  synchronize: true,
  migrationsRun: false, // ⚠️ ¡muy importante!
  logging: true,
  entities: [
    Posts,
    Photo2,
    TransportCategory,
    Vehicle,
    Brand,
    Company,
    Photographer,
    Country,
    Bodywork,
    Chassis,
    Serial,
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
