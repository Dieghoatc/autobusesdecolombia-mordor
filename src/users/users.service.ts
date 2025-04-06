import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

const db = [];

@Injectable()
export class UsersService {
  constructor(
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (db.find((user => user.email === createUserDto.email))) {
      return { message: 'User already exists' };
    }
    const authUser = await this.authService.createAuthUser(createUserDto);  
  
    db.push(authUser);
    return authUser;
  }

  async login(
    loginUser: LoginUserDto,
  ): Promise<{ email: string; password: string } | { message: string }> {
    const findUser = await db.find((user) => user.email === loginUser.email);

    if (!findUser) {
      return { message: 'User not found' };
    }
    const validUser = await this.authService.validateUser(loginUser, findUser);

    if (!validUser) {
      return { message: 'User not found' };
    }
    return { email: findUser.email, password: findUser.password };
  }
}
