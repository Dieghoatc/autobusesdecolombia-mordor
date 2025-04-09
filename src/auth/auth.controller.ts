import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get('verify')
  checkCookie(@Req() req: Request) {
    const token = req.cookies['access_token']; // 👈 accede a la cookie llamada "jwt"
    if( !token ) {
      throw new Error('No token found');
    }
    return { status: 'ok', token };
  }
}
