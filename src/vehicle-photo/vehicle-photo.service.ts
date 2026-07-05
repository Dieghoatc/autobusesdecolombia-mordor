import { Injectable } from '@nestjs/common';
import { QueryPaginationDto } from './dto/query-pagination.dto';
import { VehiclePhotoPostgresDAO } from './dao/vehicle-photo-postgresql.dao';
import { PhotoWatermarkClient } from 'src/services/mark-photo/mark-photo';

@Injectable()
export class VehiclePhotoService {
  constructor(
    private readonly photoDao: VehiclePhotoPostgresDAO,
    private readonly photowhatermarkClient: PhotoWatermarkClient,
  ) {}

  private urlApi =
    process.env.NODE_ENV === 'production'
      ? 'https://api.autobusesdecolombia.com/'
      : process.env.NODE_ENV === 'staging'
        ? 'https://abcdev1-production.up.railway.app/'
        : 'http://localhost:3000/';

  async getPhotos() {
    const page = 1;
    const limit = 20;
    const offset = (page - 1) * limit;

    const photosQuery = this.photoDao.findAllPaginated(limit, offset);
    const totalCountQuery = this.photoDao.findCount();

    const [photosResult, totalCountResult] = await Promise.all([
      photosQuery,
      totalCountQuery,
    ]);

    const startItem = offset + 1;
    const endItem = Math.min(offset + limit, totalCountResult);
    const totalPages = Math.ceil(totalCountResult / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    const nextPage = `${this.urlApi}photos/2`;

    return {
      info: {
        count: totalCountResult,
        pages: totalPages,
        limit: limit,
        next: nextPage,
        hasNext: hasNext,
        hasPrev: hasPrev,
        startItem: startItem,
        endItem: endItem,
      },
      data: photosResult,
    };
  }

  async getPhotosPagination(paginationDto: QueryPaginationDto) {
    const { page = 1, limit = paginationDto.limit ?? 20 } = paginationDto;
    const offset = (page - 1) * limit;

    const photosQuery = this.photoDao.findAllPaginated(limit, offset);
    const totalCountQuery = this.photoDao.findCount();

    const [photosResult, totalCountResult] = await Promise.all([
      photosQuery,
      totalCountQuery,
    ]);

    const startItem = offset + 1;
    const endItem = Math.min(offset + limit, totalCountResult);
    const totalPages = Math.ceil(totalCountResult / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;
    const nextPage = `${this.urlApi}photos/${page === totalPages ? totalPages : page + 1}`;
    const prevPage = `${this.urlApi}photos/${page === 1 ? 1 : page - 1}`;

    return {
      info: {
        count: totalCountResult,
        pages: totalPages,
        limit: limit,
        next: nextPage,
        prev: prevPage,
        hasNext: hasNext,
        hasPrev: hasPrev,
        startItem: startItem,
        endItem: endItem,
      },
      data: photosResult,
    };
  }

  async getPhotoById(id: number) {
    const photoQuery = this.photoDao.findById(id);
    return photoQuery;
  }

  async markPhotoService(
    file: Express.Multer.File,
    author: string,
    location?: string,
  ) {
    return await this.photowhatermarkClient.markPhoto(file, author, location);
  }
}
