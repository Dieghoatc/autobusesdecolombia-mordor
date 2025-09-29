import { Injectable } from '@nestjs/common';
import { Model } from 'src/vehicle-model/entities/vehicle-model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
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
    const words = searchPaginationDto.q.trim().split(/\s+/).filter(Boolean);

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
      .leftJoinAndSelect('model.vehicles', 'vehicles')
      .leftJoinAndSelect('vehicles.company', 'company')
      .leftJoinAndSelect('vehicles.companySerial', 'companySerial')
      .leftJoinAndSelect('vehicles.companyService', 'companyService')
      .leftJoinAndSelect('vehicles.vehiclePhotos', 'vehiclePhotos')
      .leftJoinAndSelect('vehiclePhotos.photographer', 'photographer');

    words.forEach((word, i) => {
      const p = `{p${i}}`;
      qb = qb.andWhere(
        new Brackets((qb2) => {
          qb2
            .where(`model.model_name ILIKE :p${i}`)
            .orWhere(`vehicles.plate ILIKE :p${i}`)
            .orWhere(`company.company_name ILIKE :p${i}`)
            .orWhere(`companySerial.company_serial_code ILIKE :p${i}`)
            .orWhere(`companyService.company_service_name ILIKE :p${i}`)
            .orWhere(`photographer.name ILIKE :p${i}`);
        }),
        {
          [`p${i}`]: `%${word}%`,
        },
      );
    });

    const [searchForModel, totalCount] = await qb
      .take(limit)
      .skip(offset)
      .getManyAndCount();

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
