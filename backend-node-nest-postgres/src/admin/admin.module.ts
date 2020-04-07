import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, AdminRepository]),
    TypeOrmModule.forFeature([User, UserRepository]),
    forwardRef(() => AuthModule)
  ],
  exports: [AdminService],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
