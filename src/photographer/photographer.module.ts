import { Module } from '@nestjs/common';
import { PhotographerService } from './photographer.service';
import { PhotographerController } from './photographer.controller';
import { PhotographerDAO } from './dao/photograper.dao';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photographer } from './entities/photographer.entity';

@Module({
  controllers: [PhotographerController],
  providers: [PhotographerService, PhotographerDAO],
  imports: [TypeOrmModule.forFeature([Photographer])],
  exports: [TypeOrmModule],
})
export class PhotographerModule {}
