import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  const repository = {
    existsBy: jest.fn(),
    create: jest.fn((data) => data),
    save: jest.fn(async (data) => ({ user_id: 1, ...data })),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('hashes the password, normalizes the email and does not return the hash', async () => {
    repository.existsBy.mockResolvedValue(false);

    const created = await service.create({ email: ' Editor@Example.com ', password: 'S3gura#2026' });

    const saved = repository.save.mock.calls[0][0];
    expect(saved.email).toBe('editor@example.com');
    expect(saved.password).toMatch(/^\$2b\$10\$/);
    expect(created).not.toHaveProperty('password');
  });

  it('rejects a duplicate email', async () => {
    repository.existsBy.mockResolvedValue(true);

    await expect(
      service.create({ email: 'admin@example.com', password: 'S3gura#2026' }),
    ).rejects.toThrow(ConflictException);
    expect(repository.save).not.toHaveBeenCalled();
  });
});
