import { Injectable } from '@nestjs/common';
import { TransportCategoryDAO } from './dao/transport-category.dao';

@Injectable()
export class TransportCategoriesService {
  constructor(private readonly transportCategoryDao: TransportCategoryDAO) {}

  findAll() {
    return this.transportCategoryDao.findAll();
  }

  async findBySlug(slug: string) {
    const photosQuery = this.transportCategoryDao.findBySlug(slug);
    return photosQuery;
  }
}
