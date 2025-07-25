import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Brand } from '../../brands/entities/brands.entity';

@Entity('models')
export class Model {
  @PrimaryGeneratedColumn()
  model_id: number;

  @Column({ type: 'integer', nullable: true })
  brand_id: number;

  @Column({ unique: true, nullable: true })
  model_name: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column({ type: 'integer', nullable: true, default: null })
  year_from: number;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.model)
  vehicles: Vehicle[];

  @OneToOne(() => Brand, (brand) => brand.models)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}
