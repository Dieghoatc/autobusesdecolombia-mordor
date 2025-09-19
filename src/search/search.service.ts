import { Injectable } from '@nestjs/common';
import { Model } from 'src/vehicle-model/entities/vehicle-model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchPaginationDTO } from './dto/search.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Model)
    private readonly vehicleRepository: Repository<Model>,
  ) {}

  async searchService(search: string, paginationDto: SearchPaginationDTO) {
    const page = Math.max(1, Number(paginationDto.page) || 1);
    const limit = Math.max(1, Number(paginationDto.limit) || 5);
    const offset = (page - 1) * limit;

    const models = await this.vehicleRepository
      .createQueryBuilder('model')
      .leftJoinAndSelect('model.chassis', 'chassis')
      .leftJoinAndSelect('model.bodywork', 'bodywork')
      .leftJoinAndSelect('model.vehicles', 'vehicle')
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehiclePhotos.photographer', 'photographer')
      .where('model.model_name ILIKE :search', { search: `%${search}%` })
      .take(limit)
      .skip(offset)
      .getMany();

    const totalCount = await this.vehicleRepository.createQueryBuilder('model').getCount()

    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      info: {
        count: totalCount,
        currentPage: page,
        pages: totalPages,
        limit,
        next: hasNext ? `/search?${search}?page=${page + 1}&limit=${limit}` : null,
        prev: hasPrev ? `/search?${search}?page=${page - 1}&limit=${limit}` : null,
        hasNext,
        hasPrev,
        startItem: offset + 1,
        endItem: Math.min(offset + limit, totalCount),
      },
      data: models,
    };
  }
}
