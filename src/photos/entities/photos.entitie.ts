// Entity is a class that is used to define the structure of the table in the database

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './categories.entitie';
import { Vehicle } from './vehicles.entitie';
import { Mark } from './marks.entitie';
import { Company } from './companies.entitie';
import { Photographer } from './photographers.entitie';
import { Country } from './countries.entitie';

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

  @Column()
  category_id: number;

  @Column()
  vehicle_id: number;

  @Column()
  image_url: string;

  @Column()
  mark_id: number;

  @Column()
  company_id: number;

  @Column()
  serial_company: string;

  @Column()
  chassis: string;

  @Column()
  bodywork: string;

  @Column()
  plate: string;

  @Column()
  service: string;

  @Column()
  photographer_id: number;

  @Column()
  location: string;

  @Column()
  country_id: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp' })
  last_modification: Date;

  @Column({ default: true })
  active: boolean;

  @ManyToOne(() => Category, (category) => category.photos)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.photos)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Mark, (mark) => mark.photos)
  @JoinColumn({ name: 'mark_id' })
  mark: Mark;

  @ManyToOne(() => Company, (company) => company.photos)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Photographer, (photographer) => photographer.photos)
  @JoinColumn({ name: 'photographer_id' })
  photographer: Photographer;

  @ManyToOne(() => Country, (country) => country.photos)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
