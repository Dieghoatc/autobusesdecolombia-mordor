import { Controller, Get, Param, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchPaginationDTO } from './dto/search.dto';
import { RedisService } from 'src/redis/redis.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly redisService: RedisService,
  ) {}

  @Get(':search')
  async searchController(
    @Param('search') search: string,
    @Query('query') paginationDto: SearchPaginationDTO,
  ) {
    const cacheKey = `search_${search}_${paginationDto.page}_${paginationDto.limit}`;
    const cachedData = await this.redisService.getCacheKey(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const data = await this.searchService.searchService(search, paginationDto);
    await this.redisService.setCacheKey(cacheKey, JSON.stringify(data));
    return data;
  }
}
