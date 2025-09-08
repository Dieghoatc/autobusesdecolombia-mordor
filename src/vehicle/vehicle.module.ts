import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './entities/vehicle.entity';
import { TransportCategory } from '../transport-category/entities/transport-category.entity';
import { Brand } from '../brands/entities/brands.entity';
import { Company } from '../company/entities/company.entity';
import { Model } from '../vehicle-model/entities/vehicle-model.entity';
import { Chassis } from './entities/chassis.entity';
import { Bodywork } from './entities/bodyworks.entity';
import { CompanySerial } from '../company/entities/company-serial.entity';
import { CompanyService } from '../company/entities/company-service.entity';
import { VehicleType } from '../vehicle-type/entities/vehicle-type.entity';
import { VehiclePhoto } from '../vehicle-photo/entities/vehicle-photo.entity';
import { VehicleDAO } from './dao/vehicle.dao';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService, VehicleDAO],
  imports: [
    TypeOrmModule.forFeature([
      Vehicle,
      VehiclePhoto,
      TransportCategory,
      Brand,
      Company,
      Model,
      Chassis,
      Bodywork,
      CompanySerial,
      CompanyService,
      VehicleType,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class VehicleModule {}
