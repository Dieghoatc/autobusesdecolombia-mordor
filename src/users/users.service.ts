import { Injectable, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

const db = [];

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (db.find((user) => user.email === createUserDto.email)) {
      return { message: 'User already exists' };
    }
    const authUser = await this.authService.register(createUserDto);

    db.push(authUser);
    return authUser;
  }

  async login(user: LoginUserDto) {
    const authUSer = await this.authService.login(user);
    return authUSer;
  }

  async findUserByEmail(
    email: string,
  ): Promise<{ email: string; password: string } | {}> {
    const findUser = await db.find((user) => user.email === email);

    if (!findUser) {
      throw new UnauthorizedException('User not found');
    }
    return findUser;
  }
}
