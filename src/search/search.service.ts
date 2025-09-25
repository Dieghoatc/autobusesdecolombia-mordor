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

  async searchService(searchPaginationDto: SearchPaginationDTO) {
    console.log('Search service!!!!', searchPaginationDto);

    // separar palabras por "+"
    const palabras = searchPaginationDto.q.trim().split(/\s+/).filter(Boolean);
    

    const page = Math.max(1, Number(searchPaginationDto.page) || 1);
    const limit = Math.max(1, Number(searchPaginationDto.limit) || 5);
    const offset = (page - 1) * limit;

    // ----------------------
    // Query principal
    // ----------------------
    let qb = this.vehicleRepository
      .createQueryBuilder('model')
      .leftJoinAndSelect('model.chassis', 'chassis')
      .leftJoinAndSelect('model.bodywork', 'bodywork')
      .leftJoinAndSelect('model.vehicles', 'vehicle')
      .leftJoinAndSelect('vehicle.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehiclePhotos.photographer', 'photographer');

    palabras.forEach((palabra, i) => {
      qb = qb.andWhere(`model.model_name ILIKE :p${i}`, {
        [`p${i}`]: `%${palabra}%`,
      });
    });

    const searchForModel = await qb
      .take(limit)
      .skip(offset)
      .getMany();

    // ----------------------
    // Query para contar total
    // ----------------------
    let qbCount = this.vehicleRepository.createQueryBuilder('model');

    palabras.forEach((palabra, i) => {
      qbCount = qbCount.andWhere(`model.model_name ILIKE :p${i}`, {
        [`p${i}`]: `%${palabra}%`,
      });
    });

    const totalCount = await qbCount.getCount();

    const totalPages = Math.ceil(totalCount / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    return {
      info: {
        count: totalCount,
        currentPage: page,
        pages: totalPages,
        limit,
        next: hasNext
          ? `/search?q=${encodeURIComponent(searchPaginationDto.q)}&page=${page + 1}&limit=${limit}`
          : null,
        prev: hasPrev
          ? `/search?q=${encodeURIComponent(searchPaginationDto.q)}&page=${page - 1}&limit=${limit}`
          : null,
        hasNext,
        hasPrev,
        startItem: offset + 1,
        endItem: Math.min(offset + limit, totalCount),
      },
      data: searchForModel,
    };
  }
}
