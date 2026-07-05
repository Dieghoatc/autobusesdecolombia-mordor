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

  @ApiOperation({ summary: 'Get the authenticated user profile' })
  @ApiBearerAuth('access_token')
  @ApiOkResponse({ description: 'User profile' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials or missing token' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    try {
      return req.user; // whatever you return in validate()
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User created' })
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Log in and set the access_token (JWT) cookie' })
  @ApiOkResponse({ description: 'Login successful', schema: { example: { message: 'Logged successful' } } })
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
