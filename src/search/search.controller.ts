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
    @Query() paginationDto: SearchPaginationDTO,
  ) {
    return await this.searchService.searchService(search, paginationDto);
  }
}
