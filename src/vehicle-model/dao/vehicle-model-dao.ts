import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Model } from '../entities/vehicle-model.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VehicleModelDAO {
  constructor(
    @InjectRepository(Model)
    private readonly vehicleModelRepository: Repository<Model>,
  ) {}

  async findAll() {
    return this.vehicleModelRepository.find();
  }

  async findOne(id: number, limit: number, offset: number) {

    const model = await this.vehicleModelRepository
    .createQueryBuilder('model')
    .leftJoinAndSelect('model.brand', 'brand')
    .leftJoinAndSelect('model.chassis', 'chassis')
    .leftJoinAndSelect('model.bodywork', 'bodywork')
    .where('model.model_id = :id', { id })
    .getOne();

    if (!model) return null;

    const [vehicles, total] = await this.vehicleModelRepository.manager
    .getRepository('vehicles')
    .createQueryBuilder('v')
    .where('v.model_id = :id', { id })
    .orderBy('v.vehicle_id', 'ASC')
    .skip(offset)
    .take(limit)
    .getManyAndCount();

    return {
        ...model,
        vehicles,
        totalItems: total,
      };
  }
}
