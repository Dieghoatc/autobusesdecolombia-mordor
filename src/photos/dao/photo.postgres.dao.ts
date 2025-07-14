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

  findAllPaginated(limit: number, offset: number):Promise<Photo2[]> {
    return this.photoRepository
      .createQueryBuilder('photo')
      .orderBy('photo.photo_id', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();
  }

  findById(id: number): Promise<Photo2 | undefined> {
    return this.photoRepository.findOne({ where: { photo_id: id } });
  }

  findCount(): Promise<number> {
    return this.photoRepository.count();
  }
}
