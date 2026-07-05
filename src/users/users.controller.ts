import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiOkResponse, ApiUnauthorizedResponse, ApiCreatedResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Obtiene el perfil del usuario autenticado' })
  @ApiBearerAuth('access_token')
  @ApiOkResponse({ description: 'Perfil del usuario' })
  @ApiUnauthorizedResponse({ description: 'Credenciales inválidas o token ausente' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    try {
      return req.user; // lo que retornas en validate()
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  @ApiCreatedResponse({ description: 'Usuario creado' })
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Inicia sesión y setea la cookie access_token (JWT)' })
  @ApiOkResponse({ description: 'Login exitoso', schema: { example: { message: 'Logged successful' } } })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const access_token = await this.usersService.login(loginUserDto);
    res.cookie('access_token', access_token.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.autobusesdecolombia.com',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return { message: 'Logged successful' };
  }
}
