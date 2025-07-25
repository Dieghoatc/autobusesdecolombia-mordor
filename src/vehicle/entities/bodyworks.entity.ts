import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Brand } from '../../brands/entities/brands.entity';
import { Vehicle } from './vehicle.entity';

@Entity('bodyworks')
export class Bodywork {
  @PrimaryGeneratedColumn()
  bodywork_id: number;

  @Column({ type: 'integer', nullable: true })
  brand_id: number;

  @Column({ unique: true, nullable: true })
  bodywork_name: string;

  @Column({ nullable: true, default: null })
  description: string;

  @ManyToOne(() => Brand, (brand) => brand.brand_id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bodywork)
  vehicles: Vehicle[];
}
