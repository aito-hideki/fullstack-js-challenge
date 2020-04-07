import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service'
import { UserService } from 'src/user/user.service';
import { caseConvert } from 'src/utils/case-convert';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private activationKeys: any = {}

  async validator(email: string, pwd: string): Promise<any> {
    return await this.adminValidator(email, pwd) || await this.userValidator(email, pwd);
  }

  async adminValidator(email: string, pwd: string): Promise<any> {
    const user = await this.adminService.findAdmin(email)

    if (user) {
      const { password, ...result } = user;

      return password === pwd ? result : null;
    }

    return null;
  }

  async userValidator(email: string, pwd: string): Promise<any> {
    const user = await this.userService.findUser(email);

    if (user) {
      const { password, ...result } = user;

      return password === pwd ? result : null;
    }

    return null;
  }

  async login(user: any) {
    const { email, password } = user

    const profile = await this.validator(email, password);
    if (!profile) throw new UnauthorizedException('Email or Password is not valid')

    const { isAdmin } = profile

    return caseConvert({
      accessToken: this.jwtService.sign(user),
      isAdmin
    }, false);
  }

  getUserWithActivationKey(key: string): string {
    if (!Object.prototype.hasOwnProperty.call(this.activationKeys, key)) {
      throw new BadRequestException('Activation link is not valid')
    }
    return this.activationKeys[key]
  }

  async activate(email: string, password: string) {
    const admin = this.adminService.findAdmin(email)
    if (admin) return this.adminService.activate(email, password)

    const user = this.userService.findUser(email)
    if (user) return this.userService.activate(email, password)

    throw new NotFoundException('We cannot find the user')
  }
}
