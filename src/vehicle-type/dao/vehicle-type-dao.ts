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

  findOne(id: number): Promise<VehicleType | null> {
    return this.vehicleTypeRepository.findOne({ where: { vehicle_type_id: id } });
  }

  create(data: Partial<VehicleType>): Promise<VehicleType> {
    const vehicleType = this.vehicleTypeRepository.create(data);
    return this.vehicleTypeRepository.save(vehicleType);
  }

  async update(id: number, data: Partial<VehicleType>): Promise<VehicleType | null> {
    await this.vehicleTypeRepository.update({ vehicle_type_id: id }, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.vehicleTypeRepository.delete({ vehicle_type_id: id });
  }
}
