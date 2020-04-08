import { Controller, Request, Get, Post, UseGuards, HttpCode, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { AdminService } from './admin/admin.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly adminService: AdminService,
    private readonly userService: UserService
  ) {
  }

  @Get()
  getHello() {
    return 'Hello! This Full Stack JavaScript Coding Challenge Node/Nest Backend!';
  }

  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('activate')
  @HttpCode(200)
  async activate(@Request() req) {
    const { key, password } = req.body;
    const email = this.authService.getUserWithActivationKey(key);

    return this.authService.activate(email, password);
  }

  @Post('activate/access-code')
  @HttpCode(200)
  async sendAccessCode(@Request() req) {
    const { key } = req.body;
    this.authService.sendAccessKey(key);
    return 'Access code is sent';
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('poll')
  async createPoll(@Request() req) {
    const { isAdmin, adminId } = req.user;
    if (!isAdmin) new ForbiddenException('You don\'t have permission to create a poll')

    const { name, questions } = req.body

    return this.adminService.createPoll(adminId, name, questions)
  }

  @UseGuards(JwtAuthGuard)
  @Get('poll')
  async getPolls(@Request() req) {
    const { isAdmin, adminId, userId } = req.user;

    if (isAdmin) return this.adminService.getPolls(adminId)
    return this.userService.getPolls(userId)
  }
}
