import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Poll } from 'src/poll/poll.entity';
import { PollRepository } from 'src/poll/poll.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminRepository]),
    TypeOrmModule.forFeature([User, UserRepository]),
    TypeOrmModule.forFeature([Poll, PollRepository]),
    forwardRef(() => AuthModule)
  ],
  exports: [AdminService],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
