import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Company } from "./company.entity";
import { Vehicle } from "../../vehicle/entities/vehicle.entity";

@Entity('company_serials')
export class CompanySerial {
    @PrimaryGeneratedColumn()
    company_serial_id: number;

    @Column({ type: 'integer', nullable: true })
    company_id: number;

    @Column({type: 'varchar', nullable: true})
    company_serial_code: string;

    @ManyToOne(() => Company, (company) => company.companySerials)
    @JoinColumn({ name: 'company_id' })
    company: Company;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.companySerial)
    vehicles: Vehicle[];
}