import { Injectable } from '@nestjs/common';
import { PhotoDAO } from './photo.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo2 } from '../entities/photos.entity';

@Injectable()
export class PhotoPostgresDAO implements PhotoDAO {
  constructor(
    @InjectRepository(Photo2)
    private readonly photoRepository: Repository<Photo2>,
  ) {}

  findAllPaginated(limit: number, offset: number): Promise<Photo2[]> {
    return this.photoRepository.find({
      relations: {
        category: true,
        vehicle: true,
        brand: true,
        company: true,
        serial: true,
        chassis: true,
        bodywork: true,
        photographer: true,
        country: true,
      },
      take: limit,
      skip: offset,
      order: {
        photo_id: 'DESC',
      },
    });
  }

  findById(id: number): Promise<Photo2> {
    return this.photoRepository.findOne({
      where: { photo_id: id },
      relations: {
        category: true,
        vehicle: true,
        brand: true,
        company: true,
        serial: true,
        chassis: true,
        bodywork: true,
        photographer: true,
        country: true,
      },
    });
  }

  findByCategoryPaginated(
    category: number,
    limit: number,
    offset: number,
  ): Promise<Photo2[]> {
    return this.photoRepository.find({
      where: { category: { category_id: category } },
      relations: {
        category: true,
        vehicle: true,
        brand: true,
        company: true,
        serial: true,
        chassis: true,
        bodywork: true,
        photographer: true,
        country: true,
      },
      take: limit,
      skip: offset,
      order: {
        photo_id: 'DESC',
      },
    });
  }

  findByVehiclePaginated(
    vehicle: number,
    limit: number,
    offset: number,
  ): Promise<Photo2[]> {
    return this.photoRepository.find({
      where: { vehicle: { vehicle_id: vehicle } },
      relations: {
        category: true,
        vehicle: true,
        brand: true,
        company: true,
        serial: true,
        chassis: true,
        bodywork: true,
        photographer: true,
        country: true,
      },
      take: limit,
      skip: offset,
      order: {
        photo_id: 'DESC',
      },
    });
  }

  findCount(): Promise<number> {
    return this.photoRepository.count();
  }
}
