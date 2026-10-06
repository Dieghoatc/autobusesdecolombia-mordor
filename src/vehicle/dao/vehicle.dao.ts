import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Vehicle } from '../entities/vehicle.entity';
import { VehiclePhoto } from '../../vehicle-photo/entities/vehicle-photo.entity';

import { VehicleDTO } from '../dto/vehicle.dto';
import { CompanySerialDAO } from '../../company/dao/company-serial.dao';
import { VehiclePhotoPostgresDAO } from '../../vehicle-photo/dao/vehicle-photo-postgresql.dao';

@Injectable()
export class VehicleDAO {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,

    private readonly serialDao: CompanySerialDAO,

    private readonly photoDao: VehiclePhotoPostgresDAO,
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
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehicle.model', 'model')
      .leftJoinAndSelect('vehicle.companySerial', 'companySerial')
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
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehicle.model', 'model')
      .leftJoinAndSelect('vehicle.companySerial', 'companySerial')
      .where('companySerial.company_serial_code = :serial', { serial })
      .orderBy('vehicle.vehicle_id', 'DESC')
      .take(limit)
      .skip(offset)
      .getMany();
  }

  existsById(id: number): Promise<boolean> {
    return this.vehicleRepository.existsBy({ vehicle_id: id });
  }

  async addPhoto(vehicleId: number, imageUrl: string, vehicle: VehicleDTO) {
    await this.photoDao.createVehiclePhoto(imageUrl, {
      vehicle_id: vehicleId,
      image_url: imageUrl,
      photographer_id: vehicle.photographer_id,
      country_id: 1,
      location: vehicle.location,
    });
  }

  // Creates the vehicle and its first photo in one transaction; returns the new vehicle id
  async createVehicle(imageUrl: string, vehicle: VehicleDTO): Promise<number> {
    const companySerial = vehicle.company_serial
      ? await this.serialDao.findOrCreate(vehicle.company_serial, vehicle.company_id)
      : null;

    return this.vehicleRepository.manager.transaction(async (manager) => {
      const vehicleSave = await manager.save(
        manager.create(Vehicle, {
          vehicle_type_id: vehicle.vehicle_type_id,
          model_id: vehicle.model_id,
          company_id: vehicle.company_id,
          transport_category_id: vehicle.transport_category_id,
          plate: vehicle.plate,
          company_serial_id: companySerial?.company_serial_id ?? null,
          company_service_id: vehicle.company_service_id,
        }),
      );

      await manager.save(
        manager.create(VehiclePhoto, {
          vehicle_id: vehicleSave.vehicle_id,
          image_url: imageUrl,
          photographer_id: vehicle.photographer_id,
          country_id: 1,
          location: vehicle.location,
        }),
      );

      return vehicleSave.vehicle_id;
    });
  }
}
