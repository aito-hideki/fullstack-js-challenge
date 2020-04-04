import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminRepository]),
    TypeOrmModule.forFeature([User, UserRepository])
  ],
  exports: [AdminService],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
