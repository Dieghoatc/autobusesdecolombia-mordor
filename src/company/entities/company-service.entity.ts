import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Company } from './company.entity';

@Entity('company_services')
export class CompanyService {
  @PrimaryGeneratedColumn()
  company_service_id: number;

  @Column({ type: 'integer', nullable: true })
  company_id: number;

  @Column({ type: 'varchar', nullable: true })
  company_service_name: string;

  @ManyToOne(() => Company, (company) => company.companyServices)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
