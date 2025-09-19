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
        const nodeEnv = process.env.NODE_ENV;

        if (nodeEnv === 'local') {
          const host = process.env.REDISHOST || 'localhost';
          const port = process.env.REDISPORT || 6379;

          return new Redis({ host, port: Number(port) });
        }

        const redisUrl = process.env.REDIS_URL;

        if (!redisUrl) {
          throw new Error('Configure REDIS_URL and NODE_ENV=local');
        }
        return new Redis(redisUrl, {family: 6}); //Forze ipv6
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
