import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Brand } from '../../brands/entities/brands.entity';
import { Chassis } from './chassis.entity';
import { Bodywork } from './bodyworks.entity';

@Entity('models')
export class Model {
  @PrimaryGeneratedColumn()
  model_id: number;

  @Column({ type: 'integer', nullable: true })
  brand_id: number;

  @Column({ nullable: true })
  chassis_id: number;

  @Column({ nullable: true })
  bodywork_id: number;

  @Column({ unique: true, nullable: true })
  model_name: string;

  @Column({ nullable: true, default: null })
  description: string;

  @Column({ type: 'integer', nullable: true, default: null })
  year_from: number;

  @ManyToOne(() => Brand, (brand) => brand.models)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Chassis, (chassis) => chassis.models)
  @JoinColumn({ name: 'chassis_id' })
  chassis: Chassis;

  @ManyToOne(() => Bodywork, (bodywork) => bodywork.models)
  @JoinColumn({ name: 'bodywork_id' })
  bodywork: Bodywork;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.model)
  vehicles: Vehicle[];
}
