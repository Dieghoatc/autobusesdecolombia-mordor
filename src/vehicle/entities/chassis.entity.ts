import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Brand } from '../../brands/entities/brands.entity';
import { Vehicle } from './vehicle.entity';

@Entity('chassis')
export class Chassis {
  @PrimaryGeneratedColumn()
  chassis_id: number;

  @Column({ type: 'integer', nullable: true })
  brand_id: number;

  @Column({ unique: true, nullable: true })
  chassis_name: string; 

  @Column({ nullable: true, default: null })
  description: string;

  @ManyToOne(() => Brand, (brand) => brand.chassis)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.chassis)
  vehicles: Vehicle[];
}
