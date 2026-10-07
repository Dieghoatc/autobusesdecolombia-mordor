import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import { VehiclePhoto } from '../entities/vehicle-photo.entity';

import { VehiclePhotoDAO } from './vehicle-photo.dao';

import { PhotoDTO } from '../dto/photo.dto';
import { PhotoFilterDto } from '../dto/photo-filter.dto';

@Injectable()
export class VehiclePhotoPostgresDAO implements VehiclePhotoDAO {
  constructor(
    @InjectRepository(VehiclePhoto)
    private readonly photoRepository: Repository<VehiclePhoto>,
  ) {}

  /**
   * Lists photos with optional filters, fully paginated.
   *
   * Note: every relation joined here (`vehicle`, `photographer`, `country`) is
   * many-to-one from VehiclePhoto's side, so joining them is safe to combine
   * with take/skip — unlike joining a one-to-many relation (e.g. vehicle.vehiclePhotos),
   * which would make take/skip paginate over joined rows instead of distinct photos.
   */
  findAllFiltered(
    filters: PhotoFilterDto,
    limit: number,
    offset: number,
  ): Promise<[VehiclePhoto[], number]> {
    const {
      photographer_id,
      country_id,
      vehicle_type_id,
      transport_category_id,
      company_id,
      tags,
      status,
      q,
      created_from,
      created_to,
    } = filters;

    let qb = this.photoRepository
      .createQueryBuilder('photo')
      .leftJoinAndSelect('photo.vehicle', 'vehicle')
      .leftJoinAndSelect('photo.photographer', 'photographer')
      .leftJoinAndSelect('photo.country', 'country');

    if (photographer_id) {
      qb = qb.andWhere('photo.photographer_id = :photographer_id', { photographer_id });
    }
    if (country_id) {
      qb = qb.andWhere('photo.country_id = :country_id', { country_id });
    }
    if (vehicle_type_id) {
      qb = qb.andWhere('vehicle.vehicle_type_id = :vehicle_type_id', { vehicle_type_id });
    }
    if (transport_category_id) {
      qb = qb.andWhere('vehicle.transport_category_id = :transport_category_id', {
        transport_category_id,
      });
    }
    if (company_id) {
      qb = qb.andWhere('vehicle.company_id = :company_id', { company_id });
    }
    if (status) {
      qb = qb.andWhere('photo.status = :status', { status });
    }
    if (tags) {
      qb = qb.andWhere('photo.tags ILIKE :tags', { tags: `%${tags}%` });
    }
    if (created_from) {
      qb = qb.andWhere('photo.created_at >= :created_from', { created_from });
    }
    if (created_to) {
      qb = qb.andWhere('photo.created_at <= :created_to', { created_to });
    }
    if (q) {
      qb = qb.andWhere(
        new Brackets((qb2) => {
          qb2
            .where('photo.location ILIKE :q', { q: `%${q}%` })
            .orWhere('photo.description ILIKE :q', { q: `%${q}%` })
            .orWhere('photo.tags ILIKE :q', { q: `%${q}%` });
        }),
      );
    }

    return qb
      .orderBy('photo.vehicle_photo_id', 'DESC')
      .take(limit)
      .skip(offset)
      .getManyAndCount();
  }

  findById(id: number): Promise<VehiclePhoto | null> {
    return this.photoRepository.findOne({
      where: { vehicle_photo_id: id },
      relations: {
        vehicle: true,
        photographer: true,
        country: true,
      },
    });
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
