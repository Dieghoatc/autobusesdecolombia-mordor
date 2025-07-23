import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Countries } from '../../countries/entities/countries.entity';
import { Vehicles } from '../../vehicle/entities/vehicle.entity';

@Entity('companies')
export class Companies {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column({ type: 'varchar', nullable: true })
  company_name: string;

  @Column({ type: 'varchar', nullable: true })
  servicio: string;

  @Column({ type: 'varchar', nullable: true })
  routes: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  company_logo: string;

  @Column({ type: 'varchar', nullable: true })
  city: string;

  @Column({ type: 'integer', nullable: true })
  country_id: number;

  @Column({ type: 'varchar', nullable: true })
  company_url: string;

  @Column({ default: true, nullable: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Vehicles, (vehicles) => vehicles.company_id)
  @JoinColumn({ name: 'company_id' })
  vehicles: Vehicles[];

  @ManyToOne(() => Countries, (country) => country.country_id)
  @JoinColumn({ name: 'country_id' })
  country: Countries;  
}
