import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Photo2 } from "./photos.entitie";

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn()
    country_id: number;

    @Column()
    name: string;

    @Column()   
    iso_code: string;
    
    @OneToMany(() => Photo2, (photo) => photo.country)
    @JoinColumn({ name: 'country_id' })
    photos: Photo2[];
}