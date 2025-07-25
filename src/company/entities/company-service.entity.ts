import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Company } from './company.entity';

@Entity('company_services')
export class CompanyService {
  @PrimaryGeneratedColumn()
  company_service_id: number;

  @Column({ type: 'varchar', nullable: true })
  company_service_name: string;

  @ManyToOne(() => Company, (company) => company.companyServices)
  companies: Company[];
}
