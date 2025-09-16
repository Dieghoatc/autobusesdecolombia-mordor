import { Controller, Get, Param } from '@nestjs/common';
import { TransportCategoriesService } from './transport-category.service';
import { RedisService } from 'src/redis/redis.service';

@Controller('transport-categories')
export class TransportCategoriesController {
  constructor(private readonly transportCategoriesService: TransportCategoriesService, private readonly redisService: RedisService) {}

  @Get()
  async findAll() {
    const cacheKey = `transport-categories`;
    const cachedData = await this.redisService.getCacheKey(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.transportCategoriesService.findAll();
    await this.redisService.setCacheKey(cacheKey, JSON.stringify(data));
    return data;
  } 

  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.transportCategoriesService.findBySlug(slug);
  }
}
