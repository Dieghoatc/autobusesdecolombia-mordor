import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from 'src/vehicle-model/entities/vehicle-model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
