import { Module } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { UserInfoController } from './user-info.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserInfoRepository } from './user-info.repository';
import { UserInfo } from './user-info.entity';
import { AdminRepository } from 'src/admin/admin.repository';
import { Admin } from 'src/admin/admin.entity';
import { UserRepository } from 'src/user/user.repository';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserInfo, UserInfoRepository]),
    TypeOrmModule.forFeature([Admin, AdminRepository]),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [UserInfoService],
  exports: [UserInfoService],
  controllers: [UserInfoController]
})
export class UserInfoModule {}
