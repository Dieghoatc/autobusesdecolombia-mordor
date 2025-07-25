import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TransportCategory } from '../entities/transport-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransportCategoryDAO {
  constructor(
    @InjectRepository(TransportCategory)
    private readonly transportCategoryRepository: Repository<TransportCategory>,
  ) {}

  findAll(): Promise<TransportCategory[]> {
    return this.transportCategoryRepository.find({
      order: {
        transport_category_id: 'ASC',
      },
    });
  }

  findBySlug(slug: string): Promise<TransportCategory[]> {
    return this.transportCategoryRepository.find({
      where: { slug },
    });
  }

  findCount(): Promise<number> {
    return this.transportCategoryRepository.count();
  }
}
