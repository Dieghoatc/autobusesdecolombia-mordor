import { Entity, PrimaryGeneratedColumn, OneToMany, Column, CreateDateColumn } from "typeorm";
import { VehiclePhoto } from "../../vehicle-photo/entities/vehicle-photo.entity";

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
    
    @OneToMany(() => VehiclePhoto, (photo) => photo.photographer)
    vehiclePhotos: VehiclePhoto[];
}