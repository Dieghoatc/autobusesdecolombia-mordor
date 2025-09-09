import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntiti } from './entities/company.entity';
import { CompanySerialEntiti } from './entities/company-serial.entity';
import { CompanyServiceEntiti } from './entities/company-service.entity';

import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { CompanyDao } from './dao/company.dao';

@Module({
  //Only entities in array typeorm
  imports: [TypeOrmModule.forFeature([CompanyEntiti, CompanySerialEntiti, CompanyServiceEntiti])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyDao],
  exports: [TypeOrmModule],
})
export class CompaniesModule {}
