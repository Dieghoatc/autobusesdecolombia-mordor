import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): object {
    return {
        message: 'Autobuses de Colombia API is running',
        status: 'success',
        data: {
            version: '1.0.0',
        }
    };
  }
}