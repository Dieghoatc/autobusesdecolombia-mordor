import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Model } from "../entities/vehicle-model.entity";
import { Repository } from "typeorm";

@Injectable()
export class VehicleModelDAO {
    constructor(
        @InjectRepository(Model)
        private readonly vehicleModelRepository: Repository<Model>,
    ) {}

    async findAll() {
        return this.vehicleModelRepository.find();
    }
}