import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInfo } from './user-info.entity';
import { UserInfoRepository } from './user-info.repository';
import { UserInfoService } from './user-info.service';

@Controller('user-info')
export class UserInfoController {
  constructor(
    @InjectRepository(UserInfo)
    private readonly userInfoRepository: UserInfoRepository,
    private readonly userInfoService: UserInfoService
  ) {}

  @Post()
  create (@Body() profileInfo) {
    return this.userInfoRepository.createProfile(profileInfo)
  }
}
