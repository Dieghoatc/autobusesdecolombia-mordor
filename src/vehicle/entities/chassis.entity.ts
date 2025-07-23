import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Brand } from '../../brands/entities/brands.entity';

@Entity({ name: 'chassis' })
export class Chassis {
  @PrimaryGeneratedColumn()
  chassis_id: number;

  @Column({ type: 'integer', nullable: true })
  brand_id: number;

  @Column({ unique: true, nullable: true })
  chassis_name: string; 

  @Column({ nullable: true, default: null })
  description: string;

  @ManyToOne(() => Brand, (brand) => brand.brand_id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;
}
