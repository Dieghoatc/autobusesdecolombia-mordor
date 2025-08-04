import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanySerial } from './entities/company-serial.entity';
import { CompanyService } from './entities/company-service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanySerial, CompanyService])],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
