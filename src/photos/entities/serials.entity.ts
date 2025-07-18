import { Entity, PrimaryGeneratedColumn, OneToMany, Column, JoinColumn } from "typeorm";
import { Photo2 } from "./photos.entity";

@Entity('serials')
export class Serial {
    @PrimaryGeneratedColumn()
    serial_id: number;

    @Column({type: 'varchar'})
    serial_code: string;

    @Column({type: 'integer', unique: true, nullable: true})
    company_id: number;
    
    @OneToMany(() => Photo2, (photo) => photo.serial_id)
    @JoinColumn({ name: 'serial_id' })
    photos: Photo2[];
}