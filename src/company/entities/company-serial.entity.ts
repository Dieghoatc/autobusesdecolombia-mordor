import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { CompanyEntiti } from "./company.entity";
import { Vehicle } from "../../vehicle/entities/vehicle.entity";

@Entity('company_serials')
export class CompanySerialEntiti {
    @PrimaryGeneratedColumn()
    company_serial_id: number;

    @Column({ type: 'integer', nullable: true })
    company_id: number;

    @Column({type: 'varchar', nullable: true})
    company_serial_code: string;

    @ManyToOne(() => CompanyEntiti, (company) => company.companySerials)
    @JoinColumn({ name: 'company_id' })
    company: CompanyEntiti;

    @OneToMany(() => Vehicle, (vehicle) => vehicle.companySerial)
    vehicles: Vehicle[];
}