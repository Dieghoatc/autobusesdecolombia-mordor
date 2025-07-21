import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TransportCategory } from "../entities/transport-category.entity";
import { Repository } from "typeorm";

@Injectable()
export class TransportCategoryDAO {
    constructor(
        @InjectRepository(TransportCategory)
        private readonly transportCategoryRepository: Repository<TransportCategory>,
    ) {}

    findAll(): Promise<TransportCategory[]> {
        return this.transportCategoryRepository.find();
    }

    findById(id: number): Promise<TransportCategory> {
        return this.transportCategoryRepository.findOne({ where: { category_id: id } });
    }
}