import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo, Photo2 } from './entities/photos.entity';
import { PhotoPostgresDAO } from './dao/photo.postgres.dao';
import { TransportCategory } from '../transport-categories/entities/transport-category.entity'
import { Vehicle } from './entities/vehicles.entity';
import { Brand } from './entities/brands.entity';
import { Company } from './entities/companies.entity';
import { Photographer } from './entities/photographers.entity';
import { Country } from './entities/countries.entity';
import { Bodywork } from './entities/bodyworks.entity';
import { Chassis } from './entities/chassis.entity';
import { Serial } from './entities/serials.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Photo2, TransportCategory, Vehicle, Brand, Company, Photographer, Country, Bodywork, Chassis, Serial])],
  controllers: [PhotosController],
  providers: [PhotosService, PhotoPostgresDAO],
  exports: [TypeOrmModule]
})
export class PhotosModule {}
