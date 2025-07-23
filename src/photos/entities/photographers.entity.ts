import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn, CreateDateColumn } from "typeorm";
import { Photo } from "./photos.entity";

@Entity('photographers')
export class Photographers {
    @PrimaryGeneratedColumn()
    photographer_id: number;

    @Column({ unique: true })
    name: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    phone: string;
    
    @Column({ default: true })
    active: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
    
    @OneToMany(() => Photo, (photo) => photo.photographer_id)
    @JoinColumn({ name: 'photographer_id' })
    photos: Photo[];
}