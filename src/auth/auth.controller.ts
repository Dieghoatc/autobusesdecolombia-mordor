import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: "Verify the current user's session cookie (access_token)" })
  @ApiOkResponse({ description: 'Valid token', schema: { example: { status: 'ok', token: '<jwt>' } } })
  @ApiUnauthorizedResponse({ description: 'No valid session cookie' })
  @Get('verify')
  checkCookie(@Req() req: Request) {
    const token = req.cookies['access_token']; // 👈 access the cookie named "jwt"
    if( !token ) {
      throw new Error('No token found');
    }
    return { status: 'ok', token };
  }
}
