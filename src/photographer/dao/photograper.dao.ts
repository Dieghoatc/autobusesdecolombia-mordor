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
}