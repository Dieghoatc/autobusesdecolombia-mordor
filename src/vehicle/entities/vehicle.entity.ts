import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { TransportCategory } from '../../transport-category/entities/transport-category.entity';
import { Company } from '../../company/entities/company.entity';
import { Model } from './vehicle-model.entity';
import { VehiclePhoto } from '../../vehicle-photo/entities/vehicle-photo.entity';
import { VehicleType } from './vehicle-type.entity';
import { CompanySerial } from '../../company/entities/company-serial.entity';
import { CompanyService } from '../../company/entities/company-service.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicle_id: number;

  @Column({ type: 'integer', nullable: true })
  vehicle_type_id: number;

  @Column({ type: 'integer', nullable: true })
  model_id: number;

  @Column({ type: 'integer', nullable: true })
  company_id: number;

  @Column({ type: 'integer', nullable: true })
  transport_category_id: number;

  @Column({ type: 'integer', nullable: true })
  company_serial_id: number;

  @Column({ type: 'integer', nullable: true })
  company_service_id: number

  @Column({ type: 'varchar', nullable: true })
  plate: string;

  @Column({ type: 'integer', nullable: true })
  year_manufactured: number;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => VehicleType, (vehicle_type) => vehicle_type.vehicles)
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicle_type: VehicleType;

  @ManyToOne(() => Model, (model) => model.vehicles)
  @JoinColumn({ name: 'model_id' })
  model: Model;

  @ManyToOne(() => Company, (company) => company.vehicles)
  @JoinColumn({ name: 'company_id' })
  company: Company;  

  @ManyToOne(() => TransportCategory,(category) => category.vehicles)
  @JoinColumn({ name: 'transport_category_id' })
  transportCategory: TransportCategory;

  @ManyToOne(() => CompanySerial,(companySerial) => companySerial.vehicles)
  @JoinColumn({ name: 'company_serial_id' })
  companySerial: CompanySerial;

  @ManyToOne(() => CompanyService,(companyService) => companyService.vehicles)
  @JoinColumn({ name: 'company_service_id' })
  companyService: CompanyService ;

  @OneToMany(() => VehiclePhoto,(photo) => photo.vehicle)
  vehiclePhotos: VehiclePhoto[];
}
