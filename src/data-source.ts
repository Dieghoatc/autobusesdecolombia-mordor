import { DataSource } from 'typeorm';
import { VehiclePhoto } from './vehicle-photo/entities/vehicle-photo.entity';
import { TransportCategory } from './transport-category/entities/transport-category.entity';
import { Vehicle } from './vehicle/entities/vehicle.entity';
import { Brand } from './brands/entities/brands.entity';
import { Photographer } from './photographer/entities/photographer.entity';
import { Country } from './country/entities/country.entity';
import { Bodywork } from './vehicle/entities/bodyworks.entity';
import { Chassis } from './vehicle/entities/chassis.entity';
import { CompanyEntiti } from './company/entities/company.entity';
import { CompanySerialEntiti } from './company/entities/company-serial.entity';
import { CompanyServiceEntiti } from './company/entities/company-service.entity';
import { VehicleType } from './vehicle-type/entities/vehicle-type.entity';
import { Model } from './vehicle-model/entities/vehicle-model.entity';

import { Posts } from './posts/entities/posts.entity';
import { User } from './users/entities/user.entity';

import { config } from 'dotenv';
config();

// The CLI only targets the database given explicitly in MIGRATIONS_DATABASE_URL,
// so it never falls back to DATABASE_URL (production) from .env by accident.
const migrationsUrl = process.env.MIGRATIONS_DATABASE_URL;
if (!migrationsUrl) {
  throw new Error('MIGRATIONS_DATABASE_URL is not set');
}
const { host, hostname } = new URL(migrationsUrl);
const isLocal = ['localhost', '127.0.0.1'].includes(hostname);
console.log(`[data-source] target: ${host}`);

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: migrationsUrl,
  ssl: isLocal ? false : { rejectUnauthorized: false },
  synchronize: false,
  logging: ['error', 'migration'],
  entities: [
    Posts,
    VehiclePhoto,
    Photographer,
    TransportCategory,
    Vehicle,
    Model,
    Bodywork,
    Chassis,
    Brand,
    Country,
    CompanyEntiti,
    CompanySerialEntiti,
    CompanyServiceEntiti,
    VehicleType,
    User,
  ],
  migrations: ['src/migrations/*.ts'],
});
