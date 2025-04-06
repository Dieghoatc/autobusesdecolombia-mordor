import * as bcrypt from 'bcrypt';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {

  async createAuthUser(
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
      const validUser = await bcrypt.compare(
        loginUser.password,
        findUser.password,
      );

      return validUser;
    } catch (error) {
      throw new InternalServerErrorException('Error validating user');
    }
  }
}
