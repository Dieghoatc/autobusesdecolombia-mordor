import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Photo2 } from '../../photos/entities/photos.entity';

@Entity('categories')
export class TransportCategory {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Photo2, (photo) => photo.category)
  photos: Photo2[];
}
