import { Injectable } from '@nestjs/common';
import { VehicleModelDAO } from './dao/vehicle-model-dao';
import { ModelPaginationDTO } from './dto/model-pagination.dto';

@Injectable()
export class VehicleModelService {
  constructor(private readonly vehivleModelDao: VehicleModelDAO) {}

  findAll() {
    return this.vehivleModelDao.findAll();
  }

  async findOne(id: number, paginationDto: ModelPaginationDTO) {
    const page = Math.max(1, Number(paginationDto.page) || 1);
    const limit = Math.max(1, Number(paginationDto.limit) || 20);
    const offset = (page - 1) * limit;

    const model = await this.vehivleModelDao.findOne(id, limit, offset);

    const totalPages = Math.ceil(model.totalItems / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      model,
      pagination: {
        count: model.totalItems,
        currentPage: page,
        pages: totalPages,
        limit,
        next: hasNext ? `/vehicle-model/${id}?page=${page + 1}&limit=${limit}` : null,
        prev: hasPrev ? `/vehicle-model/${id}?page=${page - 1}&limit=${limit}` : null,
        hasNext,
        hasPrev,
        startItem: offset + 1,
        endItem: Math.min(offset + limit, model.totalItems),
      },
    }
  }
}
