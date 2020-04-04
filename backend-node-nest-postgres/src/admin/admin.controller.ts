import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { AdminRepository } from './admin.repository';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: AdminRepository,
    private readonly adminService: AdminService
  ) {}

  @Post()
  create(@Body() profileInfo) {
    return this.adminRepository.createAdmin(profileInfo)
  }
}
