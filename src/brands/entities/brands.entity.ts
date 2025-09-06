import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

import { Model } from '../../vehicle-model/entities/vehicle-model.entity';
import { Chassis } from '../../vehicle/entities/chassis.entity';
import { Bodywork } from '../../vehicle/entities/bodyworks.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  brand_id: number;

  @Column({ nullable: true, unique: true })
  name: string;

  @Column({ nullable: true })
  logo: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Model, (model) => model.brand)
  models: Model[];

  @OneToMany(() => Chassis, (chassis) => chassis.brand)
  chassis: Chassis[];

  @OneToMany(() => Bodywork, (bodywork) => bodywork.brand)
  bodyworks: Bodywork[];
}
