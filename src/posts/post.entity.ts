import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  tags: string;

  @Column({ type: 'json' })
  content: any;
}