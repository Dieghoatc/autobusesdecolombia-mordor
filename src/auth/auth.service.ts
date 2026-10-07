import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { ACCESS_TOKEN_TTL_SECONDS } from './auth.constants';

// Compared against when the email does not exist, so both failure paths take
// the same time and don't reveal which emails are registered.
const DUMMY_HASH = '$2b$10$lJI76SsB7iybmvO4Pb50yOgkIhbUh2VOCuFqfXLGyRQ00lg.0P0zm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginUser: LoginUserDto) {
    const user = await this.usersService.findByEmailWithPassword(loginUser.email);
    const passwordMatches = await bcrypt.compare(
      loginUser.password,
      user?.password ?? DUMMY_HASH,
    );

    if (!user || !passwordMatches || !user.active) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      sub: user.user_id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      token_type: 'Bearer',
      expires_in: ACCESS_TOKEN_TTL_SECONDS,
      user: { user_id: user.user_id, email: user.email, role: user.role },
    };
  }
}
