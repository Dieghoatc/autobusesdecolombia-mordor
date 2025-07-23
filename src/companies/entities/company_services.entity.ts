import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vehicles } from '../../vehicle/entities/vehicle.entity';

@Entity('company_services')
export class CompanyServices {
  @PrimaryGeneratedColumn()
  company_service_id: number;

  @Column({ type: 'varchar', nullable: true })
  company_service_name: string;

  @OneToMany(() => Vehicles, (vehicle) => vehicle.companyService)
  vehicles: Vehicles[];
}
