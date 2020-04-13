import { Controller, Request, Get, Post, UseGuards, HttpCode, ForbiddenException, BadRequestException } from '@nestjs/common';
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
    if (!isAdmin) new ForbiddenException('You don\'t have permission')

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

  @UseGuards(JwtAuthGuard)
  @Post('/poll/:id/invite')
  async inviteToPoll(@Request() req) {
    if (!req.user.isAdmin) throw new ForbiddenException('You don\'t have permission')
    if (isNaN(+req.params.id)) throw new ForbiddenException('Invalid Poll ID')
    if (!req.body.email) throw new BadRequestException('Email is not valid')

    await this.adminService.inviteToPoll(req.user.adminId, req.params.id, req.body.email)
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/poll/:id')
  async submitAnswer(@Request() req) {
    if (req.user.isAdmin) throw new ForbiddenException('You don\'t have permission')
    if (isNaN(+req.params.id)) throw new ForbiddenException('Invalid Poll ID')

    await this.userService.submitAnswer(req.user.userId, req.params.id, req.body.answers)
    return true;
  }
}
