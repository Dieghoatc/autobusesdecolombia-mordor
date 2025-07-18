import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn, CreateDateColumn } from "typeorm";
import { Photo2 } from "./photos.entity";

@Entity('photographers')
export class Photographer {
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
    
    @OneToMany(() => Photo2, (photo) => photo.photographer)
    @JoinColumn({ name: 'photographer_id' })
    photos: Photo2[];
}