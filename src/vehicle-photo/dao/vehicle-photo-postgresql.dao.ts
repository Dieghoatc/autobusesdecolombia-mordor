import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { VehiclePhoto } from '../entities/vehicle-photo.entity';

import { VehiclePhotoDAO } from './vehicle-photo.dao';

import { PhotoDTO } from '../dto/photo.dto';

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

  async createVehiclePhoto(imageUrl: string, vehiclePhoto: PhotoDTO) {
    const vehiclePhotoSave = this.photoRepository.create({
      vehicle_id: vehiclePhoto.vehicle_id,
      image_url: imageUrl,
      photographer_id: vehiclePhoto.photographer_id,
      country_id: 1,
      location: vehiclePhoto.location,
    });
    
    return this.photoRepository.save(vehiclePhotoSave);
  }
}
