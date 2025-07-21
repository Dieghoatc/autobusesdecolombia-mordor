import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Photo2 } from './photos.entity';

@Entity('brands')
export class Brand {
  @PrimaryGeneratedColumn()
  brand_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  active: boolean;

  @Column({ nullable: true })
  logo: string;

  @OneToMany(() => Photo2, (photo) => photo.brand_id)
  @JoinColumn({ name: 'brand_id' })
  photos: Photo2[];
}
