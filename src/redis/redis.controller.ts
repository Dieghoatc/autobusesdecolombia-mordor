import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('/cache')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Post()
  async setCacheKey(@Body() body: { key: string; value: string }) {
    const response = await this.redisService.setCacheKey(body.key, body.value);
    console.log(response);
    return { message: 'Cache key set successfully', status: 201, succes: true, data: response };
  }

  @Get()
  async getCacheKey(@Query('key') key: string) {
    const response = await this.redisService.getCacheKey(key);
    console.log(response);
    return { message: 'Cache key get successfully', status: 200, succes: true, data: response };
  }
}
