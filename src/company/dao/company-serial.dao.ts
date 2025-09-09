import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanySerialEntiti } from '../entities/company-serial.entity';

@Injectable()
export class CompanySerialDAO {
  constructor(
    @InjectRepository(CompanySerialEntiti)
    private readonly repo: Repository<CompanySerialEntiti>,
  ) {}

  async findOrCreate(serial: string, company_id: number): Promise<CompanySerialEntiti> {
    let response = await this.repo.findOne({ where: { company_serial_code: serial } });

    if (!response) {
      response = this.repo.create({ company_serial_code: serial, company_id });
      response = await this.repo.save(response);
    }

    return response;
  }
}