import { CacheInterceptor } from '@nestjs/cache-manager';
import {
    Injectable,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class HttpCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext): string | undefined {
      const request = context.switchToHttp().getRequest();
  
      // Cachear solo GET
      if (request.method !== 'GET') {
        return undefined;
      }
  
      // Clave única basada en la URL
      return `${request.method}-${request.url}`;
    }
  
    intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      return super.intercept(context, next);
    }
  }
  