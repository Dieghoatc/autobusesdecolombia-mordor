import { Injectable, NotFoundException } from '@nestjs/common';
import { TransportCategoryDAO } from './dao/transport-category.dao';
import { TransportCategory } from './entities/transport-category.entity';

@Injectable()
export class TransportCategoriesService {
  constructor(private readonly transportCategoryDao: TransportCategoryDAO) {}

  findAll(): Promise<TransportCategory[]> {
    return this.transportCategoryDao.findAll();
  }

  async findBySlug(slug: string): Promise<TransportCategory> {
    const category = await this.transportCategoryDao.findBySlug(slug.trim().toLowerCase());
    if (!category) {
      throw new NotFoundException(`Transport category "${slug}" not found`);
    }
    return category;
  }
}
