import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Photo2 } from './photos.entity';
import { Brand } from './brands.entity';
import { Vehicle } from './vehicles.entity';

@Entity('bodyworks')
export class Bodywork {
  @PrimaryGeneratedColumn()
  bodywork_id: number;

  @Column({ type: 'integer' })
  brand_id: number;

  @Column({ unique: true })
  model: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'integer' }) 
  vehicle_id: number;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Photo2, (photo) => photo.bodywork_id)
  @JoinColumn({ name: 'bodywork_id' })
  photos: Photo2[];

  @ManyToOne(() => Brand, (brand) => brand.brand_id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicle_id)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}
