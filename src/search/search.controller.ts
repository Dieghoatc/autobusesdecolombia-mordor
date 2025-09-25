import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchPaginationDTO } from './dto/search.dto';
import { RedisService } from 'src/redis/redis.service';

@Controller('search')
export class SearchController {
  constructor(
    private readonly searchService: SearchService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  async searchController(
    @Query() searchPaginationDto: SearchPaginationDTO,
  ) {
    if (!searchPaginationDto.q || searchPaginationDto.q.trim() === '') {
      throw new BadRequestException('Query string "q" is required for searching.');
    }
    console.log("Search controller!!!!", searchPaginationDto)
    return await this.searchService.searchService(searchPaginationDto);
  }
}
