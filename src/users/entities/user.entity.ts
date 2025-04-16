import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    _id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}
