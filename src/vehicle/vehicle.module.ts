import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';

import { Vehicle } from './entities/vehicle.entity';
import { TransportCategory } from '../transport-category/entities/transport-category.entity';
import { Brand } from '../brands/entities/brands.entity';
import { CompanyEntiti } from '../company/entities/company.entity';
import { Model } from '../vehicle-model/entities/vehicle-model.entity';
import { Chassis } from './entities/chassis.entity';
import { Bodywork } from './entities/bodyworks.entity';
import { CompanySerialEntiti } from '../company/entities/company-serial.entity';
import { CompanyServiceEntiti } from '../company/entities/company-service.entity';
import { VehicleType } from '../vehicle-type/entities/vehicle-type.entity';
import { VehiclePhoto } from '../vehicle-photo/entities/vehicle-photo.entity';

import { VehicleDAO } from './dao/vehicle.dao';
import { CompanySerialDAO } from '../company/dao/company-serial.dao';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';
import { VehiclePhotoPostgresDAO } from '../vehicle-photo/dao/vehicle-photo-postgresql.dao';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      VehiclePhoto,
      TransportCategory,
      Brand,
      CompanyEntiti,
      Model,
      Chassis,
      Bodywork,
      CompanySerialEntiti,
      CompanyServiceEntiti,
      VehicleType,
      VehiclePhoto,
    ]),
    CloudinaryModule,
    RedisModule
  ],
  providers: [
    VehicleService,
    VehicleDAO,
    CompanySerialDAO,
    VehiclePhotoPostgresDAO,
  ],
  controllers: [VehicleController],
  exports: [TypeOrmModule],
})
export class VehicleModule {}
