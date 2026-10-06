import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { LoginUserDto } from '../users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthUser } from './interfaces/jwt-payload.interface';

// Served under /users to keep the paths the dashboard already uses
@ApiTags('auth')
@Controller('users')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Log in and get an access token (JWT)' })
  @ApiOkResponse({
    description: 'Login successful',
    schema: {
      example: {
        access_token: '<jwt>',
        token_type: 'Bearer',
        expires_in: 3600,
        user: { user_id: 1, email: 'admin@example.com', role: 'admin' },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiOkResponse({
    description: 'User profile',
    schema: { example: { user_id: 1, email: 'admin@example.com', role: 'admin' } },
  })
  @Auth()
  @Get('profile')
  getProfile(@CurrentUser() user: AuthUser) {
    return user;
  }
}
