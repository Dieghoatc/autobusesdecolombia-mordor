import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Photo2 } from './photos.entitie';

@Entity('marks')
export class Mark {
  @PrimaryGeneratedColumn()
  mark_id: number;

  @Column()
  name: string;

  @Column()
  active: boolean;

  @Column()
  created_at: Date;

  @OneToMany(() => Photo2, (photo) => photo.mark)
  @JoinColumn({ name: 'mark_id' })
  photos: Photo2[];
}
