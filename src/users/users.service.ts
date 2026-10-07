import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const email = this.normalizeEmail(createUserDto.email);

    if (await this.usersRepository.existsBy({ email })) {
      throw new ConflictException('Email already exists');
    }

    const user = this.usersRepository.create({
      email,
      password: await bcrypt.hash(createUserDto.password, SALT_ROUNDS),
      role: createUserDto.role,
    });
    const { password, ...saved } = await this.usersRepository.save(user);
    return saved as User;
  }

  findById(userId: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ user_id: userId });
  }

  // Includes the password hash, which is excluded from normal queries
  findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: this.normalizeEmail(email) })
      .getOne();
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }
}
