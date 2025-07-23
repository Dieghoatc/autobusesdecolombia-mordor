import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Photo } from '../../photos/entities/photos.entity';
import { Companies } from '../../companies/entities/companies.entity';

@Entity('countries')
export class Countries {
  @PrimaryGeneratedColumn()
  country_id: number;

  @Column({ unique: true })
  country_name: string;

  @Column({ unique: true })
  iso_code: string;

  @OneToMany(() => Photo, (photo) => photo.country_id)
  @JoinColumn({ name: 'country_id' })
  photos: Photo[];

  @OneToMany(() => Companies, (company) => company.country)
  companies: Companies[];
}
