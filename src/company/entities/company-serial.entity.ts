import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Company } from "./company.entity";

@Entity('company_serials')
export class CompanySerial {
    @PrimaryGeneratedColumn()
    company_serial_id: number;

    @Column({type: 'varchar', nullable: true})
    company_serial_code: string;

    @ManyToOne(() => Company, (company) => company.companySerials)
    companies: Company[];
}