import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Vehicles } from "../../vehicle/entities/vehicle.entity";

@Entity('company_serials')
export class CompanySerials {
    @PrimaryGeneratedColumn()
    company_serial_id: number;

    @Column({type: 'varchar', nullable: true})
    company_serial_code: string;

    @OneToMany(() => Vehicles, (vehicle) => vehicle.companySerial)
    vehicles: Vehicles[];
}