import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo, Photo2 } from './entities/photos.entitie';
import { PhotoPostgresDAO } from './dao/photo.postgres.dao';
import { Category } from './entities/categories.entitie';
import { Vehicle } from './entities/vehicles.entitie';
import { Mark } from './entities/marks.entitie';
import { Company } from './entities/companies.entitie';
import { Photographer } from './entities/photographers.entitie';
import { Country } from './entities/countries.entitie';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Photo2, Category, Vehicle, Mark, Company, Photographer, Country])],
  controllers: [PhotosController],
  providers: [PhotosService, PhotoPostgresDAO],
  exports: [TypeOrmModule]
})
export class PhotosModule {}
