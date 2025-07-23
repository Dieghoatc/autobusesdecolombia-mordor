import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Companies } from './entities/companies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Companies])],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
