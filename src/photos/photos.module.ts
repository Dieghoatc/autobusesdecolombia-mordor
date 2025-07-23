import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoPostgresDAO } from './dao/photo.postgres.dao';

import { Photo } from './entities/photos.entity';
import { Vehicles } from '../vehicle/entities/vehicle.entity';
import { Photographers } from './entities/photographers.entity';
import { Countries } from '../countries/entities/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Vehicles, Photographers, Countries])],
  controllers: [PhotosController],
  providers: [PhotosService, PhotoPostgresDAO],
  exports: [TypeOrmModule]
})
export class PhotosModule {}
