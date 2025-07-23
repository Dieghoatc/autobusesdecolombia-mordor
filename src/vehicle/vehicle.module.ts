import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicles } from './entities/vehicle.entity';
import { TransportCategory } from '../transport-categories/entities/transport-category.entity';
import { Brand } from '../brands/entities/brands.entity';
import { Companies } from '../companies/entities/companies.entity';
import { Models } from './entities/vehicle-models.entity';
import { Chassis } from './entities/chassis.entity';
import { Bodywork } from './entities/bodyworks.entity';
import { CompanySerials } from '../companies/entities/company_serials.entity';
import { CompanyServices } from '../companies/entities/company_services.entity';
import { VehicleType } from './entities/vehicle-type.entity';

@Module({
  controllers: [VehicleController],
  providers: [VehicleService],
  imports: [
    TypeOrmModule.forFeature([
      Vehicles,
      TransportCategory,
      Brand,
      Companies,
      Models,
      Chassis,
      Bodywork,
      CompanySerials,
      CompanyServices,
      VehicleType,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class VehicleModule {}
