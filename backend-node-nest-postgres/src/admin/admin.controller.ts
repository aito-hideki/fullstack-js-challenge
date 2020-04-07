import { Controller, Body, Request, Get, Post, UseGuards, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: AdminRepository,
    private readonly adminService: AdminService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Request() req, @Body() profileInfo) {
    const { isAdmin } = req.user
    if (!isAdmin) throw new ForbiddenException('You are not allowed')

    const { email } = profileInfo
    return this.adminService.createProfile({ email })
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllAdmins(@Request() req) {
    const { isAdmin } = req.user

    if (!isAdmin) throw new ForbiddenException('You are not allowed')

    return this.adminService.getAllAdmins()
  }
}
