import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Vehicles } from '../../vehicle/entities/vehicle.entity';
import { Photographers } from '../../photos/entities/photographers.entity';
import { Countries } from '../../countries/entities/countries.entity';
import { TransportCategory } from '../../transport-categories/entities/transport-category.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  photo_id: number;

  @Column({ type: 'integer' })
  vehicle_id: number;

  @Column({ type: 'varchar', unique: true })
  image_url: string;

  @Column({ type: 'integer' })
  photographer_id: number;

  @Column({ type: 'integer' })
  transport_category_id: number;

  @Column({ type: 'varchar' })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  department: string;

  @Column({ type: 'integer' })
  country_id: number;

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

  @ManyToOne(() => Vehicles, (vehicles) => vehicles.vehicle_id)
  @JoinColumn({ name: 'vehicle_id' })
  vehicles: Vehicles;

  @ManyToOne(() => Photographers, (photographers) => photographers.photographer_id)
  @JoinColumn({ name: 'photographer_id' })
  photographers: Photographers;

  @ManyToOne(() => Countries, (countries) => countries.country_id)
  @JoinColumn({ name: 'country_id' })
  countries: Countries;

  @ManyToOne(() => TransportCategory, (transportCategory) => transportCategory.transport_category_id)
  @JoinColumn({ name: 'transport_category_id' })
  transportCategory: TransportCategory;
}
