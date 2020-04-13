import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { Admin } from 'src/admin/admin.entity';
import { AdminRepository } from 'src/admin/admin.repository';
import { AuthModule } from 'src/auth/auth.module';
import { Poll } from 'src/poll/poll.entity';
import { PollRepository } from 'src/poll/poll.repository';
import { Paper } from 'src/paper/paper.entity';
import { PaperRepository } from 'src/paper/paperl.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),
    TypeOrmModule.forFeature([Admin, AdminRepository]),
    TypeOrmModule.forFeature([Poll, PollRepository]),
    TypeOrmModule.forFeature([Paper, PaperRepository]),
    forwardRef(() => AuthModule)
  ],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
