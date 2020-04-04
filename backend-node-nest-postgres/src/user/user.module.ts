import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Admin } from 'src/admin/admin.entity';
import { AdminRepository } from 'src/admin/admin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    TypeOrmModule.forFeature([Admin, AdminRepository])
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
