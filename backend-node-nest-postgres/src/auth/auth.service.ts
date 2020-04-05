import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service'
import { UserService } from 'src/user/user.service';
import { caseConvert } from 'src/utils/case-convert';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validator(email: string): Promise<any> {
    return await this.adminValidator(email) || await this.userValidator(email);
  }

  async adminValidator(email: string): Promise<any> {
    const user = await this.adminService.findAdmin(email)

    if (user) {
      const { password, ...result } = user;
      void (password)

      return result;
    }

    return null;
  }

  async userValidator(email: string): Promise<any> {
    const user = await this.userService.findUser(email);

    if (user) {
      const { password, ...result } = user;
      void (password)

      return result;
    }

    return null;
  }

  async login(user: any) {
    return caseConvert({
      accessToken: this.jwtService.sign(user),
    }, false);
  }
}
