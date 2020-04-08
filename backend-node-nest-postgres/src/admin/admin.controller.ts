import { Controller, Request, Get, Post, UseGuards, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';

@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: AdminRepository,
    private readonly adminService: AdminService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req) {
    const { isAdmin } = req.user;
    if (!isAdmin) throw new ForbiddenException('You are not allowed');

    const { email } = req.body;
    const admin = this.adminService.createProfile(email);

    if (admin) {
      this.authService.sendActivationLink(email);
      return {
        ...admin,
        isAdmin: true
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllAdmins(@Request() req) {
    const { isAdmin } = req.user;

    if (!isAdmin) throw new ForbiddenException('You are not allowed');

    return this.adminService.getAllAdmins();
  }
}
