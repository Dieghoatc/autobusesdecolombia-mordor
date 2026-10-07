import { Controller, Get, Param } from '@nestjs/common';
import { TransportCategoriesService } from './transport-category.service';
import { RedisService } from 'src/redis/redis.service';
import { ApiTags, ApiOperation, ApiParam, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';

export const TRANSPORT_CATEGORIES_CACHE_KEY = 'transport-categories';
// Expires so new or edited categories reach clients without clearing Redis by hand
export const TRANSPORT_CATEGORIES_CACHE_TTL_SECONDS = 60 * 60;

@ApiTags('transport-categories')
@Controller('transport-categories')
export class TransportCategoriesController {
  constructor(private readonly transportCategoriesService: TransportCategoriesService, private readonly redisService: RedisService) {}

  @ApiOperation({ summary: 'List all transport categories (cached in Redis for 1 hour)' })
  @ApiOkResponse({
    description: 'All categories, ordered by id',
    schema: {
      example: [
        {
          transport_category_id: 1,
          name: 'Transporte Interdepartamental',
          description: '...',
          slug: 'transporte-interdepartamental',
          created_at: '2025-07-24T08:50:53.974Z',
        },
      ],
    },
  })
  @Get()
  async findAll() {
    const cachedData = await this.redisService.getCacheKey(TRANSPORT_CATEGORIES_CACHE_KEY);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.transportCategoriesService.findAll();
    await this.redisService.setCacheKey(
      TRANSPORT_CATEGORIES_CACHE_KEY,
      JSON.stringify(data),
      TRANSPORT_CATEGORIES_CACHE_TTL_SECONDS,
    );
    return data;
  }

  @ApiOperation({
    summary: 'Get a transport category by slug',
    description: 'Case and surrounding spaces are ignored (e.g. "Turismo" finds "turismo").',
  })
  @ApiParam({ name: 'slug', example: 'transporte-intermunicipal' })
  @ApiOkResponse({ description: 'The category' })
  @ApiNotFoundResponse({ description: 'No category with that slug' })
  @Get(':slug')
  findBySlug(@Param('slug') slug: string) {
    return this.transportCategoriesService.findBySlug(slug);
  }
}
