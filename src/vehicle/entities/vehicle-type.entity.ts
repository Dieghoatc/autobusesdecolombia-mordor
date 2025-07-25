import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

import { Vehicle } from './vehicle.entity';

@Entity({ name: 'vehicle_types' })
export class VehicleType {
  @PrimaryGeneratedColumn()
  vehicle_type_id: number;

  @Column({ unique: true, nullable: true })
  name: string; 

  @Column({ nullable: true, default: null })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Vehicle, (vehicle) => vehicle.vehicle_type)
  vehicles: Vehicle[];
}