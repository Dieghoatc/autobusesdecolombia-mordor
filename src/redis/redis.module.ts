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
        const nodeEnv = process.env.REDISHOST || 'staging';
        const host = process.env.REDISHOST
        const port = process.env.REDISPORT

        if (nodeEnv === 'staging') {
          return new Redis({ host, port: parseInt(port) });
        }

        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
          throw new Error('Configure REDIS_URL and NODE_ENV=staging');
        }
        return new Redis(redisUrl);
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
