import { Controller, Request, Get, Post, UseGuards, HttpCode, Param } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {
  }

  @Get()
  getHello() {
    return 'Hello! This Full Stack JavaScript Coding Challenge Node/Nest Backend!'
  }

  @Post('auth/login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('activate')
  @HttpCode(200)
  async activate(@Request() req) {
    const { key, password } = req.body
    const email = this.authService.getUserWithActivationKey(key)

    return this.authService.activate(email, password)
  }

  @Post('activate/access-code')
  @HttpCode(200)
  async sendAccessCode(@Request() req) {
    const { key } = req.body
    this.authService.sendAccessKey(key)
    return 'Access code is sent'
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}