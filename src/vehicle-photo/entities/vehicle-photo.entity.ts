import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { Photographer } from '../../photographer/entities/photographer.entity';
import { Country } from '../../country/entities/country.entity';

@Entity('vehicle_photos')
export class VehiclePhoto {
  @PrimaryGeneratedColumn()
  vehicle_photo_id: number;

  @Column({ type: 'integer' })
  vehicle_id: number;

  @Column({ type: 'varchar', unique: true })
  image_url: string;

  @Column({ type: 'integer' })
  photographer_id: number;

  @Column({ type: 'integer' })
  country_id: number;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  department: string; 

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  notes: string;

  @Column({ type: 'varchar', nullable: true })
  tags: string;

  @Column({ type: 'varchar', nullable: true })
  status: string;

  @Column({ type: 'integer', nullable: true })
  likes: number;

  @Column({ type: 'integer', nullable: true })
  views: number;

  @Column({ type: 'integer', nullable: true })
  favorites: number;

  @Column({ type: 'integer', nullable: true })
  shares: number;

  @Column({ type: 'integer', nullable: true })
  comments: number;

  @Column({ type: 'integer', nullable: true })
  downloads: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehiclePhotos)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @ManyToOne(() => Photographer, (photographer) => photographer.vehiclePhotos)
  @JoinColumn({ name: 'photographer_id' })
  photographer: Photographer;

  @ManyToOne(() => Country, (country) => country.vehiclePhotos)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
