import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { Role } from '../users/enums/role.enum';

describe('AuthService', () => {
  let service: AuthService;
  const usersService = { findByEmailWithPassword: jest.fn() };
  const jwtService = { signAsync: jest.fn().mockResolvedValue('signed.jwt.token') };

  const user = {
    user_id: 1,
    email: 'admin@example.com',
    password: bcrypt.hashSync('correct-password', 4),
    role: Role.Admin,
    active: true,
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('returns a token and the user for valid credentials', async () => {
    usersService.findByEmailWithPassword.mockResolvedValue(user);

    const result = await service.login({ email: user.email, password: 'correct-password' });

    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: 1,
      email: 'admin@example.com',
      role: Role.Admin,
    });
    expect(result).toEqual({
      access_token: 'signed.jwt.token',
      token_type: 'Bearer',
      expires_in: 3600,
      user: { user_id: 1, email: 'admin@example.com', role: Role.Admin },
    });
  });

  it('rejects a wrong password', async () => {
    usersService.findByEmailWithPassword.mockResolvedValue(user);

    await expect(
      service.login({ email: user.email, password: 'wrong-password' }),
    ).rejects.toThrow(new UnauthorizedException('Invalid credentials'));
  });

  it('rejects an unknown email with the same error', async () => {
    usersService.findByEmailWithPassword.mockResolvedValue(null);

    await expect(
      service.login({ email: 'nobody@example.com', password: 'whatever' }),
    ).rejects.toThrow(new UnauthorizedException('Invalid credentials'));
  });

  it('rejects an inactive user', async () => {
    usersService.findByEmailWithPassword.mockResolvedValue({ ...user, active: false });

    await expect(
      service.login({ email: user.email, password: 'correct-password' }),
    ).rejects.toThrow(UnauthorizedException);
    expect(jwtService.signAsync).not.toHaveBeenCalled();
  });

  it('creates a short-lived upload token with the upload scope', async () => {
    const result = await service.createUploadToken({
      user_id: 1,
      email: 'admin@example.com',
      role: Role.Admin,
    });

    expect(jwtService.signAsync).toHaveBeenCalledWith(
      { sub: 1, email: 'admin@example.com', role: Role.Admin, scope: 'upload' },
      { expiresIn: 600 },
    );
    expect(result).toEqual({ upload_token: 'signed.jwt.token', token_type: 'Bearer', expires_in: 600 });
  });
});
