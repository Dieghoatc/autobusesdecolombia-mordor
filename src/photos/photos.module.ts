import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo, Photo2 } from './entities/photos.entitie';
import { PhotoPostgresDAO } from './dao/photo.postgres.dao';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Photo2])],
  controllers: [PhotosController],
  providers: [PhotosService, PhotoPostgresDAO],
  exports: [TypeOrmModule]
})
export class PhotosModule {}
