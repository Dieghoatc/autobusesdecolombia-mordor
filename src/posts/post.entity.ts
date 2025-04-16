import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // ✅ Necesario
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ type: 'json' })
  content: any;
}