import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  controllers: [RedisController],
  providers: [RedisService],
  imports: [CacheModule.register({
    isGlobal: true,
    max: 100,
    ttl: 600,
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    auth_passs: process.env.REDIS_PASSWORD,   
    db:0 
  })]
})
export class RedisModule {}
