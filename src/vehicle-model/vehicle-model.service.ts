import { Injectable } from '@nestjs/common';
import { CreateVehicleModelDto } from './dto/create-vehicle-model.dto';
import { UpdateVehicleModelDto } from './dto/update-vehicle-model.dto';
import { VehicleModelDAO } from './dao/vehicle-model-dao';

@Injectable()
export class VehicleModelService {
  constructor(private readonly vehivleModelDao: VehicleModelDAO) {}

  create(createVehicleModelDto: CreateVehicleModelDto) {
    return 'This action adds a new vehicleModel';
  }

  findAll() {
    return this.vehivleModelDao.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} vehicleModel`;
  }

  update(id: number, updateVehicleModelDto: UpdateVehicleModelDto) {
    return `This action updates a #${id} vehicleModel`;
  }

  remove(id: number) {
    return `This action removes a #${id} vehicleModel`;
  }
}
