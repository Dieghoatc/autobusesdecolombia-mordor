import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { LoginUserDto } from '../users/dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { AuthUser, JwtPayload } from './interfaces/jwt-payload.interface';
import { ACCESS_TOKEN_TTL_SECONDS, UPLOAD_TOKEN_TTL_SECONDS } from './auth.constants';

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

  // Short-lived token the browser uses to send photos straight to the API. It only
  // works on endpoints marked @UploadTokenAllowed(), so the session token never has
  // to leave the dashboard server.
  async createUploadToken(user: AuthUser) {
    const payload: JwtPayload = {
      sub: user.user_id,
      email: user.email,
      role: user.role,
      scope: 'upload',
    };

    return {
      upload_token: await this.jwtService.signAsync(payload, {
        expiresIn: UPLOAD_TOKEN_TTL_SECONDS,
      }),
      token_type: 'Bearer',
      expires_in: UPLOAD_TOKEN_TTL_SECONDS,
    };
  }
}
