import { Module } from '@nestjs/common';
import { TransportCategoriesService } from './transport-category.service';
import { TransportCategoriesController } from './transport-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportCategory } from './entities/transport-category.entity';
import { TransportCategoryDAO } from './dao/transport-category.dao';

@Module({
  controllers: [TransportCategoriesController],
  providers: [TransportCategoriesService, TransportCategoryDAO],
  imports: [TypeOrmModule.forFeature([TransportCategory])],
  exports: [TypeOrmModule],
})
export class TransportCategoriesModule {}

