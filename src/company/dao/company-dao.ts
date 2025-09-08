import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Company } from "../entities/company.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompanyDao {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) {}

    findAll() {
        return this.companyRepository.find();
    }
}
