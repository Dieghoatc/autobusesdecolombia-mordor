import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { VehiclePhoto } from '../../vehicle-photo/entities/vehicle-photo.entity';
import { Company } from '../../company/entities/company.entity';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  country_id: number;

  @Column({ unique: true })
  country_name: string;

  @Column({ unique: true })
  iso_code: string;

  @OneToMany(() => VehiclePhoto, (photo) => photo.country)
  vehiclePhotos: VehiclePhoto[];

  @OneToMany(() => Company, (company) => company.country)
  companies: Company[];
}
