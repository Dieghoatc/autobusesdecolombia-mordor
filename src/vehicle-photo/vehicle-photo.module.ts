import { Module } from '@nestjs/common';
import { VehiclePhotoController } from './vehicle-photo.controller';
import { VehiclePhotoService } from './vehicle-photo.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehiclePhoto } from './entities/vehicle-photo.entity';
import { Vehicle } from '../vehicle/entities/vehicle.entity';
import { Country } from '../country/entities/country.entity';
import { VehiclePhotoPostgresDAO } from './dao/vehicle-photo-postgresql.dao';
import { PhotoWatermarkService } from 'src/services/watermark/photo-watermark.service';
import { Photographer } from 'src/photographer/entities/photographer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([VehiclePhoto, Vehicle, Photographer, Country]),
  ],
  controllers: [VehiclePhotoController],
  providers: [
    VehiclePhotoService,
    VehiclePhotoPostgresDAO,
    PhotoWatermarkService,
  ],
  exports: [TypeOrmModule],
})
export class PhotosModule {}
