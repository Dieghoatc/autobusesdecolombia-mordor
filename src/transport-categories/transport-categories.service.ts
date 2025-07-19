import { Injectable } from '@nestjs/common';
import { CreateTransportCategoryDto } from './dto/create-transport-category.dto';
import { UpdateTransportCategoryDto } from './dto/update-transport-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TransportCategory } from './entities/transport-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransportCategoriesService {
  constructor(
    @InjectRepository(TransportCategory)
    private readonly transportCategoryRepository: Repository<TransportCategory>,
  ) {}

  create(createTransportCategoryDto: CreateTransportCategoryDto) {
    return this.transportCategoryRepository.save(createTransportCategoryDto);
  }

  findAll() {
    return this.transportCategoryRepository.find();
  }

  findOne(id: number) {
    return this.transportCategoryRepository.findOne({ where: { category_id: id } });
  }

  update(id: number, updateTransportCategoryDto: UpdateTransportCategoryDto) {
    return this.transportCategoryRepository.update(id, updateTransportCategoryDto);
  }

  remove(id: number) {
    return this.transportCategoryRepository.delete(id);
  }
}
