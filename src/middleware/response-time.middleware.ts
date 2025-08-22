import { Injectable, NestMiddleware } from '@nestjs/common';
import * as responseTime from 'response-time';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Usa el middleware response-time para calcular el tiempo
    responseTime()(req, res, () => {
      // Llama al siguiente middleware o controlador
      res.on('finish', () => {
        const time = res.getHeader('X-Response-Time');
      });
      next();
    });
  }
}
