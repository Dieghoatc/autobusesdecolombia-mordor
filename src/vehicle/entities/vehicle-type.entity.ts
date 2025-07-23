import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Models } from './vehicle-models.entity';

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

  @OneToMany(() => Models, (model) => model.vehicle_type_id)
  @JoinColumn({ name: 'vehicle_type_id' })
  models: Models[];
}