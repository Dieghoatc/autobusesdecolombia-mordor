import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { Country } from '../../country/entities/country.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { CompanySerialEntiti } from './company-serial.entity';
import { CompanyServiceEntiti } from './company-service.entity';

@Entity('companies')
export class CompanyEntiti {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column({ type: 'integer', nullable: true })
  country_id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
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

  @Column({ type: 'varchar', nullable: true })
  company_url: string;

  @Column({ default: true, nullable: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.company)
  vehicles: Vehicle[];

  @ManyToOne(() => Country, (country) => country.companies)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @OneToMany(() => CompanySerialEntiti, (companySerial) => companySerial.company)
  companySerials: CompanySerialEntiti[];

  @OneToMany(() => CompanyServiceEntiti, (companyService) => companyService.company)
  companyServices: CompanyServiceEntiti[];
}
