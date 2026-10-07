import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redis: Redis, // <-- inyectamos el cliente
  ) {}

  // Without ttlSeconds the key never expires
  async setCacheKey(key: string, value: string, ttlSeconds?: number) {
    if (ttlSeconds) {
      await this.redis.set(key, value, 'EX', ttlSeconds);
    } else {
      await this.redis.set(key, value);
    }
    return value;
  }

  async getCacheKey(key: string) {
    return await this.redis.get(key);
  }

  async delCacheByPattern(pattern: string) {
    const keys = await this.redis.keys(pattern);
    if (keys.length) {
      await this.redis.del(...keys);
    }
  }
}
