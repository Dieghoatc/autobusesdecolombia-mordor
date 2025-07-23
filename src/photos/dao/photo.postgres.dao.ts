import { Injectable } from '@nestjs/common';
import { PhotoDAO } from './photo.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from '../entities/photos.entity';

@Injectable()
export class PhotoPostgresDAO implements PhotoDAO {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

  findAllPaginated(limit: number, offset: number): Promise<Photo[]> {
    return this.photoRepository.find({
      relations: {
        vehicles: true,
        photographers: true,
        countries: true,
      },
      take: limit,
      skip: offset,
      order: {
        photo_id: 'DESC',
      },
    });
  }

  findById(id: number): Promise<Photo> {
    return this.photoRepository.findOne({
      where: { photo_id: id },
      relations: {
        vehicles: true,
        photographers: true,
        countries: true,
      },
    });
  }

  findByCategoryPaginated(
    category: number,
    limit: number,
    offset: number,
  ): Promise<Photo[]> {    
    return this.photoRepository.find({
      where: { transport_category_id: category },
      relations: {
        vehicles: true,
        photographers: true,
        countries: true,
        transportCategory: true,
      },
      take: limit,
      skip: offset,
      order: {
        photo_id: 'DESC',
      },
    });
  }

  findByCategoryCount(category: number):Promise<number> {
    return this.photoRepository.count({
      where: { transport_category_id: category },
    });
  }

  findCount(): Promise<number> {
    return this.photoRepository.count();
  }
}
