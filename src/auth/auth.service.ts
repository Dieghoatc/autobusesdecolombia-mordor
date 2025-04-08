import * as bcrypt from 'bcrypt';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';



@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async register(
    createUserDto: CreateUserDto,
  ): Promise<{ email: string; password: string } | { message: string }> {
    try {
      const hashed = await bcrypt.hash(createUserDto.password, 10);
      return { email: createUserDto.email, password: hashed };
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async validateUser(
    loginUser: LoginUserDto,
    findUser: LoginUserDto,
  ): Promise<boolean> { 
    try {
      return await bcrypt.compare(loginUser.password, findUser.password);
    } catch (error) {
      throw new InternalServerErrorException('Error validating user');
    }
  }

  async login(loginUser: LoginUserDto): Promise<{ access_token: string }> {
    const findUser = await this.userService.findUserByEmail(loginUser.email);
    const validUser = await this.validateUser(loginUser, findUser);

    if (!validUser) {
      throw new UnauthorizedException('Invalid password');
    }
    const payload = { sub: loginUser.email };
    const token = await this.jwtService.sign(payload);

    return { access_token: token };
  }
}
