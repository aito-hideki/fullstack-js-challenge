import { Injectable } from '@nestjs/common';
import { UserInfoService } from 'src/user-info/user-info.service'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userInfoService: UserInfoService,
    private jwtService: JwtService
  ) {}

  async validator(email: string, password: string): Promise<any> {
    const user = await this.userInfoService.findProfile(email);

    if (user && user.password === password) {
      const { password, ...result } = user;
      void(password)

      return result;
    }

    return null;
  }

  async login(user: any) {
    const { id, email } = user
    const payload = { id, email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
