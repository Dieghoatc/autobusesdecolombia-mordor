import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyEntiti } from "../entities/company.entity";
import { CompanyServiceEntiti } from "../entities/company-service.entity";
import { CompanySerialEntiti } from "../entities/company-serial.entity";
import { Repository } from "typeorm";

@Injectable()
export class CompanyDao {
    constructor(
        @InjectRepository(CompanyEntiti)
        private companyRepository: Repository<CompanyEntiti>,

        @InjectRepository(CompanyServiceEntiti)
        private companyServiceRepository: Repository<CompanyServiceEntiti>,

        @InjectRepository(CompanySerialEntiti)
        private companySerialRepository: Repository<CompanySerialEntiti>
    ) {}

    findAll() {
        return this.companyRepository.find();
    }

    findAllSerials(): Promise<CompanySerialEntiti[]> {
        return this.companySerialRepository.find();
    }

    findAllServices() {
        return this.companyServiceRepository.find();
    }
}
