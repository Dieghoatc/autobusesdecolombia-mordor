import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import { CacheModule } from '@nestjs/cache-manager';
import Redis from 'ioredis';

@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 60
    }),
  ],
  controllers: [RedisController],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const redisUrl = process.env.REDIS_URL;
        return new Redis(redisUrl);
      },
    },
    RedisService,
  ],
})
export class RedisModule {}
