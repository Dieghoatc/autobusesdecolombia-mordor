import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Photo2 } from './photos.entity';
import { Brand } from './brands.entity';
import { Vehicle } from './vehicles.entity';

@Entity({ name: 'chassis' })
export class Chassis {
  @PrimaryGeneratedColumn()
  chassis_id: number;

  @Column()
  brand_id: number;

  @Column({ unique: true })
  model: string;

  @Column()
  description: string;

  @Column()
  vehicle_id: number;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Photo2, (photo) => photo.chassis)
  @JoinColumn({ name: 'chassis_id' })
  photos: Photo2[];

  @ManyToOne(() => Brand, (brand) => brand.brand_id)
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicle_id)
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;
}
