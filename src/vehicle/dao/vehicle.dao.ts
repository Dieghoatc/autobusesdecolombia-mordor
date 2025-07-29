import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Repository, In } from 'typeorm';

@Injectable()
export class VehicleDAO {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async findAllPaginatedByIdTransportCategory(
    id: number,
    limit: number,
    offset: number,
  ): Promise<Vehicle[]> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle') 
      .leftJoinAndSelect('vehicle.company', 'company')
      .leftJoinAndSelect('vehicle.model', 'model')
      .leftJoinAndSelect('model.chassis', 'chassis')
      .leftJoinAndSelect('model.bodywork', 'bodywork')
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehiclePhotos.photographer', 'photographer')
      .where('vehicle.transport_category_id = :id', { id })
      .orderBy('vehicle.vehicle_id', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findCount(id: number): Promise<number> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .where('vehicle.transport_category_id = :id', { id })
      .getCount();
  }
}