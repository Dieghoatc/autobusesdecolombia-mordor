import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

// imports: [
//   TypeOrmModule.forRoot({
//     type: 'postgres',
//     host: 'postgresql://postgres:VIMuocTfEdgRGmhlhZEVJkNskFrsJTUn@trolley.proxy.rlwy.net:50188/railway',
//     port: 5432,
//     username: 'postgres',
//     password: 'VIMuocTfEdgRGmhlhZEVJkNskFrsJTUn',
//     database: 'railway',
//     entities: [User],
//     synchronize: true,
//   }),
// ],
