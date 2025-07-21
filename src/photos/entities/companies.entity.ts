import {
  Entity,
  PrimaryGeneratedColumn,
  Column, 
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Photo2 } from './photos.entity';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ default: true })
  active: boolean;
  
  @OneToMany(() => Photo2, (photo) => photo.company)
  @JoinColumn({ name: 'company_id' })
  photos: Photo2[];
}
