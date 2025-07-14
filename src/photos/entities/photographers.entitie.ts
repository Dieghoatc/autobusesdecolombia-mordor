import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn } from "typeorm";
import { Photo2 } from "./photos.entitie";

@Entity('photographers')
export class Photographer {
    @PrimaryGeneratedColumn()
    photographer_id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;
    
    @Column()
    active: boolean;

    @Column()
    created_at: Date;
    
    @OneToMany(() => Photo2, (photo) => photo.photographer)
    @JoinColumn({ name: 'photographer_id' })
    photos: Photo2[];
}