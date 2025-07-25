import { Injectable } from '@nestjs/common';
import { VehiclePhotoDAO } from './vehicle-photo.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiclePhoto } from '../entities/vehicle-photo.entity';

@Injectable()
export class VehiclePhotoPostgresDAO implements VehiclePhotoDAO {
  constructor(
    @InjectRepository(VehiclePhoto)
    private readonly photoRepository: Repository<VehiclePhoto>,
  ) {}

  findAllPaginated(limit: number, offset: number): Promise<VehiclePhoto[]> {
    return this.photoRepository.find({
      relations: {
        vehicle: true,
        photographer: true,
        country: true,
      },
      take: limit,
      skip: offset,
      order: {
        vehicle_photo_id: 'DESC',
      },
    });
  }

  findById(id: number): Promise<VehiclePhoto> {
    return this.photoRepository.findOne({
      where: { vehicle_photo_id: id },
      relations: {
        vehicle: true,
        photographer: true,
        country: true,
      },
    });
  } 

  findCount(): Promise<number> {
    return this.photoRepository.count();
  }
}
