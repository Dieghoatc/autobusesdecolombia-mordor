import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn } from "typeorm";
import { Photo2 } from "./photos.entity";

@Entity('vehicles')
export class Vehicle {
    @PrimaryGeneratedColumn()
    vehicle_id: number;

    @Column({type: 'varchar', unique: true})
    name: string;

    @Column({type: 'varchar'})
    description: string;
    
    @OneToMany(() => Photo2, (photo) => photo.vehicle)
    @JoinColumn({ name: 'vehicle_id' })
    photos: Photo2[];
}