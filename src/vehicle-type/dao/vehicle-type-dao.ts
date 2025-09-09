import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleType } from '../entities/vehicle-type.entity';

@Injectable()
export class VehicleTypeDao {
  constructor(
    @InjectRepository(VehicleType)
    private readonly vehicleTypeRepository: Repository<VehicleType>,
  ) {}

  findAll() {
    return this.vehicleTypeRepository.find();
  }
}
