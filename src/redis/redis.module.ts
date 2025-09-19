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
      ttl: 60,
    }),
  ],
  controllers: [RedisController],
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const host = process.env.REDISHOST || 'localhost';
        const port = process.env.REDISPORT || 6379;

        return new Redis({ host, port: Number(port) });
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
