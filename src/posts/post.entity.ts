import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  slug: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true, type: 'json' })
  content: any;
}