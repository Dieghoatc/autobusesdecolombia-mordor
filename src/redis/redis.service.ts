import { Injectable, OnModuleInit } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit() {
    try {
      await this.cacheManager.set('health-check', 'ok', 10); // 10 segundos
      const value = await this.cacheManager.get('health-check');
      console.log('✅ Redis connected successfully:', value);
    } catch (err) {
      console.error('❌ Error connecting to Redis:', err);
    }
  }

  async setCacheKey(key: string, value: string): Promise<void> {
    console.log('🚀 Setting cache key:', key, value);
    await this.cacheManager.set(key, value);
  }

  async getCacheKey(key: string): Promise<string> {
    console.log('🚀 Getting cache key:', key);
    return this.cacheManager.get(key);
  }

  async deleteCacheKey(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async clearCache(): Promise<void> {
    await this.cacheManager.clear();
  }

  // Generar clave de caché basada en parámetros
  generateCacheKey(baseKey: string, params: any): string {
    const paramString = JSON.stringify(params);
    return `${baseKey}:${Buffer.from(paramString).toString('base64')}`;
  }

}
