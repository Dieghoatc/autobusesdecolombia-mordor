import { Module } from '@nestjs/common';
import { VehicleTypeService } from './vehicle-type.service';
import { VehicleTypeController } from './vehicle-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleType } from './entities/vehicle-type.entity';
import { VehicleTypeDao } from './dao/vehicle-type-dao';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleType])],
  controllers: [VehicleTypeController],
  providers: [VehicleTypeService, VehicleTypeDao],
  exports: [TypeOrmModule],
})
export class VehicleTypeModule {}
