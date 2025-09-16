import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('/cache')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  async setCacheKey(@Body() body: { key: string; value: string }) {
    await this.redisService.setCacheKey(body.key, body.value);
    return { message: 'Cache key set successfully', status: 201, succes: true };
  }

  @Get()
  async getCacheKey(@Query('key') key: string) {
    return { message: 'Cache key get successfully', status: 200, succes: true, data: this.redisService.getCacheKey(key) };
  }
}
