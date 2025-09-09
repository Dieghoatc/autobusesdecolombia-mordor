import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { CompanyEntiti } from './company.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';

@Entity('company_services')
export class CompanyServiceEntiti {
  @PrimaryGeneratedColumn()
  company_service_id: number;

  @Column({ type: 'integer', nullable: true })
  company_id: number;

  @Column({ type: 'varchar', nullable: true })
  company_service_name: string;

  @ManyToOne(() => CompanyEntiti, (company) => company.companyServices)
  @JoinColumn({ name: 'company_id' })
  company: CompanyEntiti;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.companyService)
  vehicles: Vehicle[]
}
