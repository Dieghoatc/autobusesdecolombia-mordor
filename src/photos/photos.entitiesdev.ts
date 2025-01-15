import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  photo_id: number;

  @Column()
  url: string;

  @Column()
  serial: string;

  @Column()
  bodywork: string;

  @Column()
  chassis: string;

  @Column()
  author: string;

  @Column()
  created_at: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  plate: string;
}
