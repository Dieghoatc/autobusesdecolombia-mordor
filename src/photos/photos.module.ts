import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photos.entitiesdev';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService],
  imports: [
    TypeOrmModule.forFeature([Photo])
  ]
})
export class PhotosModule {}
