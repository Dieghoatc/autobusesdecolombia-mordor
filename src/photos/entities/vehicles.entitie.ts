import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn } from "typeorm";
import { Photo2 } from "./photos.entitie";

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    vehicle_id: number;

    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    active: boolean;

    @Column()
    created_at: Date;
    
    @OneToMany(() => Photo2, (photo) => photo.vehicle)
    @JoinColumn({ name: 'vehicle_id' })
    photos: Photo2[];
}