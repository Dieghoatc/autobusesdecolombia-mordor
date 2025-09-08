import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { CompanySerial } from './entities/company-serial.entity';
import { CompanyController } from './company.controller';
import { CompanyDao } from './dao/company-dao';
import { CompanyService } from './company.service';

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanySerial, CompanyService])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyDao],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
