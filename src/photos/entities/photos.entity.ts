// Entity is a class that is used to define the structure of the table in the database

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Category } from './categories.entity';
import { Vehicle } from './vehicles.entity';
import { Brand } from './brands.entity';
import { Company } from './companies.entity';
import { Photographer } from './photographers.entity';
import { Country } from './countries.entity';
import { Bodywork } from './bodyworks.entity';
import { Chassis } from './chassis.entity';
import { Serial } from './serials.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  photo_id: number;

  @Column()
  category_id: number;

  @Column()
  type_id: number;

  @Column()
  url: string;

  @Column()
  company: string;

  @Column()
  serial: string;

  @Column()
  bodywork: string;

  @Column()
  chassis: string;

  @Column()
  plate: string;

  @Column()
  service: string;

  @Column()
  author: string;

  @Column()
  id_international: number;

  @Column()
  country: string;

  @Column()
  location: string;

  @Column()
  create_at: string;
}

@Entity('photos')
export class Photo2 {
  @PrimaryGeneratedColumn()
  photo_id: number;

  @Column({ type: 'integer' })
  category_id: number;

  @Column({ type: 'integer'} )
  vehicle_id: number;

  @Column({ type: 'varchar', unique: true })
  image_url: string;

  @Column({ type: 'integer' })
  brand_id: number;

  @Column({ type: 'integer' })
  company_id: number;

  @Column({ type: 'varchar' })
  serial_company: string;

  @Column({ type: 'integer', nullable: true })
  serial_id: number;

  @Column({ type: 'integer' })
  chassis_id: number;

  @Column({ type: 'integer' })
  bodywork_id: number;

  @Column({ type: 'varchar' })
  plate: string;

  @Column({ type: 'varchar' })
  service: string;

  @Column({ type: 'integer' })
  photographer_id: number;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'integer' })
  country_id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Category, (category) => category.category_id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicle_id)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Brand, (brand) => brand.brand_id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Chassis, (chassis) => chassis.chassis_id)
  @JoinColumn({ name: 'chassis_id' })
  chassis: Chassis;

  @ManyToOne(() => Bodywork, (bodywork) => bodywork.bodywork_id)
  @JoinColumn({ name: 'bodywork_id' })
  bodywork: Bodywork;

  @ManyToOne(() => Company, (company) => company.company_id)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Photographer, (photographer) => photographer.photographer_id)
  @JoinColumn({ name: 'photographer_id' })
  photographer: Photographer;

  @ManyToOne(() => Country, (country) => country.country_id)
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @ManyToOne(() => Serial, (serial) => serial.serial_id)
  @JoinColumn({ name: 'serial_id' })
  serial: Serial;
}
