import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CreateDateColumn } from 'typeorm';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  resume: string;

  @Column({ nullable: true })
  category: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  tags: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ nullable: true, type: 'json' })
  content: any;
}
