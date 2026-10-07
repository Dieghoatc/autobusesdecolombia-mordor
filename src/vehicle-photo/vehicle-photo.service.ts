import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PhotoFilterDto } from './dto/photo-filter.dto';
import { VehiclePhotoPostgresDAO } from './dao/vehicle-photo-postgresql.dao';
import { PhotoWatermarkService } from 'src/services/watermark/photo-watermark.service';
import { ImageConvert } from 'src/utils/imageConvert';

@Injectable()
export class VehiclePhotoService {
  constructor(
    private readonly photoDao: VehiclePhotoPostgresDAO,
    private readonly photoWatermarkService: PhotoWatermarkService,
  ) {}

  private imageConvert = new ImageConvert();

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

  // Adds the watermark and converts the photo to AVIF
  async markPhotoService(
    file: Express.Multer.File,
    author: string,
    location?: string,
    quality?: number,
  ): Promise<Buffer> {
    try {
      return await this.photoWatermarkService.markPhoto(file.buffer, author, location, quality);
    } catch (error) {
      // sharp rejects files that are not images or are corrupt
      throw new BadRequestException('Unsupported or corrupt image');
    }
  }

  // Converts the photo to an optimized AVIF, without watermark
  async optimizePhotoService(file: Express.Multer.File, quality?: number): Promise<Buffer> {
    try {
      return await this.imageConvert.toAvif(file.buffer, quality);
    } catch (error) {
      // sharp rejects files that are not images or are corrupt
      throw new BadRequestException('Unsupported or corrupt image');
    }
  }
}
