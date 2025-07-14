import {
  Entity,
  PrimaryGeneratedColumn,
  Column, 
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Photo2 } from './photos.entitie';

@Entity('companies')
export class Company {
  @PrimaryGeneratedColumn()
  company_id: number;

  @Column()
  name: string;

  @Column()
  active: boolean;
  @Column()
  created_at: Date;

  @OneToMany(() => Photo2, (photo) => photo.company)
  @JoinColumn({ name: 'company_id' })
  photos: Photo2[];
}
