import { Injectable } from '@nestjs/common';
import { PhotoDAO } from './photo.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo2 } from '../entities/photos.entitie';

@Injectable()
export class PhotoPostgresDAO implements PhotoDAO {
  constructor(
    @InjectRepository(Photo2)
    private readonly photoRepository: Repository<Photo2>,
  ) {}

  //left join make relationships between tables and use the names relationships not the names columns

  findAllPaginated(limit: number, offset: number): Promise<Photo2[]> {
    return this.photoRepository
      .createQueryBuilder('photo')
      .leftJoin('photo.category', 'category')
      .leftJoin('photo.vehicle', 'vehicle')
      .leftJoin('photo.mark', 'mark')
      .leftJoin('photo.company', 'company')
      .leftJoin('photo.photographer', 'photographer')
      .leftJoin('photo.country', 'country')
      .select([
        'photo.photo_id',
        'category.name AS category',
        'vehicle.name AS vehicle',
        'photo.image_url',
        'mark.name AS mark',
        'company.name AS company',
        'photo.serial_company',
        'photo.chassis',
        'photo.bodywork',
        'photo.plate',
        'photo.service',
        'photographer.name AS photographer',
        'country.name AS country',
        'photo.location',
        'photo.created_at',
        'photo.last_modification',
        'photo.active',
      ])

      .orderBy('photo.photo_id', 'DESC')
      .skip(offset)
      .take(limit)
      .getRawMany();
  }

  findById(id: number): Promise<Photo2 | undefined> {
    return this.photoRepository.findOne({ where: { photo_id: id } });
  }

  findCount(): Promise<number> {
    return this.photoRepository.count();
  }
}
