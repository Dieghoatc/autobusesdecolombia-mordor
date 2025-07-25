import { Module } from '@nestjs/common';
import { VehiclePhotoController } from './vehicle-photo.controller';
import { VehiclePhotoService } from './vehicle-photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiclePhoto } from './entities/vehicle-photo.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Photographer } from './entities/photographer.entity';
import { Country } from '../country/entities/country.entity';
import { VehiclePhotoPostgresDAO } from './dao/vehicle-photo-postgresql.dao';

@Module({
  imports: [TypeOrmModule.forFeature([VehiclePhoto, Vehicle, Photographer, Country])],
  controllers: [VehiclePhotoController],
  providers: [VehiclePhotoService, VehiclePhotoPostgresDAO],
  exports: [TypeOrmModule]
})
export class PhotosModule {}
