import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleTypeDto } from './dto/create-vehicle-type.dto';
import { UpdateVehicleTypeDto } from './dto/update-vehicle-type.dto';
import { VehicleTypeDao } from './dao/vehicle-type-dao';

@Injectable()
export class VehicleTypeService {
  constructor(private readonly vehicleTypeDao: VehicleTypeDao) {}

  create(createVehicleTypeDto: CreateVehicleTypeDto) {
    return this.vehicleTypeDao.create(createVehicleTypeDto);
  }

  findAll() {
    return this.vehicleTypeDao.findAll();
  }

  async findOne(id: number) {
    const vehicleType = await this.vehicleTypeDao.findOne(id);
    if (!vehicleType) {
      throw new NotFoundException(`Vehicle type #${id} not found`);
    }
    return vehicleType;
  }

  async update(id: number, updateVehicleTypeDto: UpdateVehicleTypeDto) {
    await this.findOne(id);
    return this.vehicleTypeDao.update(id, updateVehicleTypeDto);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.vehicleTypeDao.remove(id);
    return { message: `Vehicle type #${id} removed` };
  }
}
