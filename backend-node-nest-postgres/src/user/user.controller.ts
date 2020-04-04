import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly userService: UserService
  ) {}

  @Post()
  create(@Body() profileInfo) {
    return this.userRepository.create(profileInfo)
  }
}
