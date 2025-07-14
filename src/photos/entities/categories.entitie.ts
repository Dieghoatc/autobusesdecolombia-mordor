import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Photo2 } from './photos.entitie';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @Column()
  created_at: Date;

  @OneToMany(() => Photo2, (photo) => photo.category)
  photos: Photo2[];
}
