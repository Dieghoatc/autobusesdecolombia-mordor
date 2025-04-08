import { Controller, Get, Post, Body, Res, HttpStatus, HttpCode, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    try {
      return req.user; // lo que retornas en validate()
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  } 

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) res: Response) {

    const access_token = await this.usersService.login(loginUserDto);
    res.cookie('access_token', access_token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30,
    });

    return { message: 'Logged in' };
  }
}
