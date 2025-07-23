import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Countries } from './entities/countries.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Countries])],
  exports: [TypeOrmModule],
})
export class CountriesModule {}
