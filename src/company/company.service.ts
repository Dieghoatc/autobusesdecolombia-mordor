import { Injectable } from '@nestjs/common';
import { CompanyDao } from './dao/company-dao';

@Injectable()
export class CompanyService {
    constructor(private readonly companyDao: CompanyDao) {}

    findAll() {
        return this.companyDao.findAll();
    }
}
