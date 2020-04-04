import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service'
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validator(email: string): Promise<any> {
    const user = await this.adminService.findAdmin(email) || await this.userService.findUser(email);

    if (user) {
      const { password, ...result } = user;
      void(password)

      return result;
    }

    return null;
  }

  async login(user: any) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
