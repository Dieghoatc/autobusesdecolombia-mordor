import { Module } from '@nestjs/common';
import { VehicleModelService } from './vehicle-model.service';
import { VehicleModelController } from './vehicle-model.controller';
import { VehicleModelDAO } from './dao/vehicle-model-dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/vehicle-model.entity';

@Module({
  controllers: [VehicleModelController],
  providers: [VehicleModelService, VehicleModelDAO],
  imports: [TypeOrmModule.forFeature([Model])],
  exports: [TypeOrmModule]
})
export class VehicleModelModule {}
