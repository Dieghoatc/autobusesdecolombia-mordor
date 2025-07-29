import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Brand } from '../../brands/entities/brands.entity';
import { Model } from './vehicle-model.entity';

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

  @ManyToOne(() => Brand, (brand) => brand.bodyworks)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @OneToMany(() => Model, (model) => model.bodywork)
  models: Model[];
}
