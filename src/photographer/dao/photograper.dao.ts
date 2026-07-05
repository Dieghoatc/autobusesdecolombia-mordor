import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Photographer } from "../entities/photographer.entity";
import { Repository } from "typeorm";

@Injectable()
export class PhotographerDAO {
    constructor(
        @InjectRepository(Photographer)
        private readonly photographerRepository: Repository<Photographer>,
    ) {}

    async findAll(): Promise<Photographer[]> {
        return this.photographerRepository.find();
    }

    async findOne(id: number): Promise<Photographer | null> {
        return this.photographerRepository.findOne({ where: { photographer_id: id } });
    }

    async create(data: Partial<Photographer>): Promise<Photographer> {
        const photographer = this.photographerRepository.create(data);
        return this.photographerRepository.save(photographer);
    }

    async update(id: number, data: Partial<Photographer>): Promise<Photographer | null> {
        await this.photographerRepository.update({ photographer_id: id }, data);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.photographerRepository.delete({ photographer_id: id });
    }
}