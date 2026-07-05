import { Injectable, NotFoundException } from '@nestjs/common';
import { PhotoFilterDto } from './dto/photo-filter.dto';
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

  /** Plain listing, no filters — kept for the simple `/photo` endpoint. */
  async getPhotos() {
    return this.getPhotosPagination({});
  }

  async getPhotosPagination(filters: PhotoFilterDto) {
    const page = Math.max(1, Number(filters.page) || 1);
    const limit = Math.max(1, Number(filters.limit) || 20);
    const offset = (page - 1) * limit;

    const [photosResult, totalCountResult] = await this.photoDao.findAllFiltered(
      filters,
      limit,
      offset,
    );

    const startItem = offset + 1;
    const endItem = Math.min(offset + limit, totalCountResult);
    const totalPages = Math.ceil(totalCountResult / limit);
    const hasNext = page < totalPages;
    const hasPrev = page > 1;

    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (key !== 'page' && key !== 'limit' && value !== undefined) {
        query.set(key, String(value));
      }
    }
    const suffix = query.toString() ? `&${query.toString()}` : '';

    return {
      info: {
        count: totalCountResult,
        currentPage: page,
        pages: totalPages,
        limit,
        next: hasNext ? `${this.urlApi}photo/page?page=${page + 1}&limit=${limit}${suffix}` : null,
        prev: hasPrev ? `${this.urlApi}photo/page?page=${page - 1}&limit=${limit}${suffix}` : null,
        hasNext,
        hasPrev,
        startItem,
        endItem,
      },
      data: photosResult,
    };
  }

  async getPhotoById(id: number) {
    const photo = await this.photoDao.findById(id);
    if (!photo) {
      throw new NotFoundException(`Photo #${id} not found`);
    }
    return photo;
  }

  async markPhotoService(
    file: Express.Multer.File,
    author: string,
    location?: string,
  ) {
    return await this.photowhatermarkClient.markPhoto(file, author, location);
  }
}
