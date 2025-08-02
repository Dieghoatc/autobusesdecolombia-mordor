import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Company } from './company.entity';
import { Vehicle } from 'src/vehicle/entities/vehicle.entity';

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

  @OneToMany(() => Vehicle, (vehicle) => vehicle.companyService)
  vehicles: Vehicle[]
}
