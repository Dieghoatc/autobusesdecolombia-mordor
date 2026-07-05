import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: 'Verifica la cookie de sesión (access_token) del usuario actual' })
  @ApiOkResponse({ description: 'Token válido', schema: { example: { status: 'ok', token: '<jwt>' } } })
  @ApiUnauthorizedResponse({ description: 'No hay cookie de sesión válida' })
  @Get('verify')
  checkCookie(@Req() req: Request) {
    const token = req.cookies['access_token']; // 👈 accede a la cookie llamada "jwt"
    if( !token ) {
      throw new Error('No token found');
    }
    return { status: 'ok', token };
  }
}
