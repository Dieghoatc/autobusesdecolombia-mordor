import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis, // <-- inyectamos el cliente
  ) {}

  async setCacheKey(key: string, value: string) {
    await this.redis.set(key, value);
    return value;
  }

  async getCacheKey(key: string) {
    return await this.redis.get(key);
  }

  async delCacheKey(key: string) {
    return await this.redis.del(key);
  }
}
