import { Injectable } from '@nestjs/common';
import { UserInfoService } from '../user-info/user-info.service'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userInfoService: UserInfoService,
    private jwtService: JwtService
  ) {}

  async validator(username: string, password: string): Promise<any> {
    const user = await this.userInfoService.findOne(username);

    if (user && user.password === password) {
      const { password, ...result } = user;
      void(password)

      return result;
    }

    return null;
  }

  async login(user: any) {
    const { id, username } = user
    const payload = { id, username };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
