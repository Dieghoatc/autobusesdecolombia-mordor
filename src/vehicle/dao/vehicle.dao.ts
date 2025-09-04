import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleDAO {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async findVehicleByID(id: number): Promise<Vehicle> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.model', 'model')
      .leftJoinAndSelect('vehicle.company', 'company')
      .leftJoinAndSelect('vehicle.transportCategory', 'transportCategory')
      .leftJoinAndSelect('model.brand', 'brand')
      .leftJoinAndSelect('model.chassis', 'chassis')
      .leftJoinAndSelect('chassis.brand', 'brandFromChassis')
      .leftJoinAndSelect('model.bodywork', 'bodywork')
      .leftJoinAndSelect('bodywork.brand', 'brandFromBodywork')
      .leftJoinAndSelect('vehicle.companySerial', 'companySerial')
      .leftJoinAndSelect('companySerial.company', 'companyFromSerial')
      .leftJoinAndSelect('vehicle.companyService', 'companyService')
      .leftJoinAndSelect('companyService.company', 'companyFromService')
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehiclePhotos.photographer', 'photographer')
      .where('vehicle.vehicle_id = :id', { id })
      .getOne();
  }

  async findAllPaginatedByIdTransportCategory(
    id: number,
    limit: number,
    offset: number,
  ): Promise<Vehicle[]> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.model', 'model')
      .leftJoinAndSelect('vehicle.company', 'company')
      .leftJoinAndSelect('vehicle.transportCategory', 'transportCategory')
      .leftJoinAndSelect('vehicle.companySerial', 'companySerial')
      .leftJoinAndSelect('companySerial.company', 'companyFromSerial')
      .leftJoinAndSelect('vehicle.companyService', 'companyService')
      .leftJoinAndSelect('companyService.company', 'companyFromService')
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehiclePhotos.photographer', 'photographer')
      .where('vehicle.transport_category_id = :id', { id })
      .orderBy('vehicle.vehicle_id', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findCountByID(id: number): Promise<number> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .where('vehicle.transport_category_id = :id', { id })
      .getCount();
  }

  async findAll(limit: number, offset: number): Promise<Vehicle[]> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.company', 'company')
      .leftJoinAndSelect('vehicle.model', 'model')
      .leftJoinAndSelect('model.chassis', 'chassis')
      .leftJoinAndSelect('model.bodywork', 'bodywork')
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehiclePhotos.photographer', 'photographer')
      .orderBy('vehicle.vehicle_id', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findCount(): Promise<number> {
    return this.vehicleRepository.createQueryBuilder('vehicle').getCount();
  }

  async findVehicleForPlate(
    plate: string,
    limit: number,
    offset: number,
  ): Promise<Vehicle[]> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .where('vehicle.plate = :plate', { plate })
      .orderBy('vehicle.vehicle_id', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  async findVehicleForSerial(
    serial: string,
    limit: number,
    offset: number,
  ): Promise<Vehicle[]> {
    return this.vehicleRepository
      .createQueryBuilder('vehicle')
      .leftJoinAndSelect('vehicle.companySerial', 'companySerial')
      .where('companySerial.company_serial_code = :serial', { serial })
      .orderBy('vehicle.vehicle_id', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }
}  