import { Controller, Post, Request, UseGuards, Get, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminRepository } from 'src/admin/admin.repository';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly adminRepository: AdminRepository,
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req) {
    const { email: adminEmail, isAdmin } = req.user;
    const { email } = req.body;
    if (!isAdmin) throw new ForbiddenException('You are not allowed');

    const user = this.userService.createProfile(email, adminEmail);

    if (user) {
      this.authService.sendActivationLink(email);
      return {
        ...user,
        isAdmin: false
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUsersForAdmin(@Request() req) {
    const { isAdmin, adminId } = req.user;

    if (!isAdmin) throw new ForbiddenException('You are not allowed');

    return this.userService.getUsersForAdmin(adminId);
  }
}
