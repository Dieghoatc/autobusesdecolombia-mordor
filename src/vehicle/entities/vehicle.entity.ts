import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TransportCategory } from '../../transport-categories/entities/transport-category.entity';
import { Companies } from '../../companies/entities/companies.entity';
import { Models } from './vehicle-models.entity';
import { Chassis } from './chassis.entity';
import { Bodywork } from './bodyworks.entity';
import { CompanySerials } from '../../companies/entities/company_serials.entity';
import { CompanyServices } from '../../companies/entities/company_services.entity';

@Entity('vehicles')
export class Vehicles {
  @PrimaryGeneratedColumn()
  vehicle_id: number;

  @Column({ type: 'integer', nullable: true })
  vehicle_type_id: number;

  @Column({ type: 'integer', nullable: true })
  model_id: number;

  @Column({ type: 'integer', nullable: true })
  chassis_id: number;

  @Column({ type: 'integer', nullable: true })
  bodywork_id: number;

  @Column({ type: 'integer', nullable: true })
  company_id: number;

  @Column({ type: 'integer', nullable: true })
  company_serial_id: number;

  @Column({ type: 'integer', nullable: true })
  company_service_id: number;

  @Column({ type: 'integer', nullable: true })
  transport_category_id: number;

  @Column({ type: 'varchar', nullable: true })
  plate: string;

  @Column({ type: 'integer', nullable: true })
  year_manufactured: number;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Models, (model) => model.model_id)
  @JoinColumn({ name: 'model_id' })
  model: Models;

  @ManyToOne(() => Chassis, (chassis) => chassis.chassis_id)
  @JoinColumn({ name: 'chassis_id' })
  chassis: Chassis;

  @ManyToOne(() => Bodywork, (bodywork) => bodywork.bodywork_id)
  @JoinColumn({ name: 'bodywork_id' })
  bodywork: Bodywork;

  @ManyToOne(() => Companies, (company) => company.company_id)
  @JoinColumn({ name: 'company_id' })
  company: Companies;

  @ManyToOne(
    () => TransportCategory,
    (transportCategory) => transportCategory.transport_category_id,
  )
  @JoinColumn({ name: 'transport_category_id' })
  transportCategory: TransportCategory;

  @ManyToOne(
    () => CompanySerials,
    (companySerial) => companySerial.company_serial_id,
  )
  @JoinColumn({ name: 'company_serial_id' })
  companySerial: CompanySerials;

  @ManyToOne(
    () => CompanyServices,
    (companyService) => companyService.company_service_id,
  )
  @JoinColumn({ name: 'company_service_id' })
  companyService: CompanyServices;
}
