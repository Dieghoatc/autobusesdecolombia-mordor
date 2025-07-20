import { Module } from '@nestjs/common';
import { TransportCategoriesService } from './transport-categories.service';
import { TransportCategoriesController } from './transport-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransportCategory } from './entities/transport-category.entity';

@Module({
  controllers: [TransportCategoriesController],
  providers: [TransportCategoriesService],
  imports: [TypeOrmModule.forFeature([TransportCategory])],
  exports: [TypeOrmModule],
})
export class TransportCategoriesModule {}

