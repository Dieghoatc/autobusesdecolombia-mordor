import { Injectable, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

const db = [
  {
    email: 'admin@abc.com',
    password: '$2b$10$nXOv0LdQrflvS6iR7y4VFeJoFbjqHLToLedrSfZcTW39hx03Zgeba'
  }
];

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto):Promise<{email: string; password: string}> {
    if (db.find((user) => user.email === createUserDto.email)) {
      throw new UnauthorizedException('Email already exists');
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
