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
        const nodeEnv = process.env.NODE_ENV || 'development';

        // Desarrollo: usar Redis local en Docker
        if (['development', 'dev', 'local'].includes(nodeEnv)) {
          const host = process.env.REDIS_HOST || '127.0.0.1';
          const port = process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379;
          return new Redis({ host, port });
        }

        // Otros entornos: usar URL completa
        const redisUrl = process.env.REDIS_URL;
        if (!redisUrl) {
          throw new Error('REDIS_URL no está definido para el entorno actual. Configure REDIS_URL o establezca NODE_ENV=development para usar Redis local.');
        }
        return new Redis(redisUrl);
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
