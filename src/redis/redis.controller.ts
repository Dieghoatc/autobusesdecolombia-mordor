import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('cache')
@Controller('/cache')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @ApiOperation({ summary: 'Guarda un valor en caché (Redis)' })
  @ApiQuery({ name: 'key', example: 'posts' })
  @ApiQuery({ name: 'value', example: '{"foo":"bar"}' })
  @Post()
  async setCacheKey(@Query('key') key: string, @Query('value') value: string) {
    console.log('🚀 Setting cache key:', key, value); 
    try {
      if (!key || !value) {
        throw new Error('Key and value are required');
      }
      const response = await this.redisService.setCacheKey(key, value);
      console.log(response);
      return { message: 'Cache key set successfully', status: 201, succes: true, data: response };
    } catch (error) {
      console.error('Error setting cache key:', error);
      return { message: 'Error setting cache key', status: 500, succes: false, data: error };
    }
  }

  @ApiOperation({ summary: 'Obtiene un valor de caché (Redis)' })
  @ApiQuery({ name: 'key', example: 'posts' })
  @Get()
  async getCacheKey(@Query('key') key: string) {
    console.log('🚀 Getting cache key:', key);
    const response = await this.redisService.getCacheKey(key);
    console.log(response);
    return { message: 'Cache key get successfully', status: 200, succes: true, data: response };
  }
}
