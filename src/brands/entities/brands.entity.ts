import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import { Models } from '../../vehicle/entities/vehicle-models.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  brand_id: number;

  @Column({ nullable: true })
  brand_name: string;

  @Column({ nullable: true })
  brand_logo: string;

  @Column({ nullable: true })
  brand_url: string;

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Models, (model) => model.brand_id)
  @JoinColumn({ name: 'brand_id' })
  models: Models[];
}
