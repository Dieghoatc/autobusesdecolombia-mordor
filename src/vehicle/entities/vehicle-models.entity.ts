import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Brand } from '../../brands/entities/brands.entity';
import { VehicleType } from './vehicle-type.entity';

@Entity('models')
export class Models {
  @PrimaryGeneratedColumn()
  model_id: number;

  @Column({ type: 'integer', nullable: true })
  brand_id: number;

  @Column({ type: 'integer', nullable: true })
  vehicle_type_id: number;

  @Column({ unique: true, nullable: true })
  model_name: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column({ type: 'integer', nullable: true, default: null })
  year_from: number;

  @OneToOne(() => Brand, (brand) => brand.brand_id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToOne(() => VehicleType, (vehicle_type) => vehicle_type.vehicle_type_id)
  @JoinColumn({ name: 'vehicle_type_id' })
  vehicle_type: VehicleType;
}
