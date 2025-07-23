import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany, JoinColumn } from 'typeorm';
import { Vehicles } from '../../vehicle/entities/vehicle.entity';

@Entity('transport_categories')
export class TransportCategory {
  @PrimaryGeneratedColumn()
  transport_category_id: number;

  @Column({type: 'varchar', nullable: true })
  name: string;

  @Column({type: 'varchar', nullable: true })
  description: string;

  @Column({type: 'varchar', nullable: true })
  slug: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @OneToMany(() => Vehicles, (vehicles) => vehicles.transport_category_id)
  @JoinColumn({ name: 'transport_category_id' })
  vehicles: Vehicles[];
}
