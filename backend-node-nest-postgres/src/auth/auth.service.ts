import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import { UserService } from 'src/user/user.service';
import { caseConvert } from 'src/utils/case-convert';
import generateHash from 'random-hash';
import { sendMail } from 'src/utils/mailer';

const { SUPERADMIN_SERVICE, CLIENT_BASEURL } = process.env;

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private activationKeys: any = {};

  async validator(email: string, pwd: string): Promise<any> {
    return (await this.adminService.validator(email, pwd)) ||
      (await this.userService.validator(email, pwd));
  }

  async login(user: any) {
    const { email, password } = user;

    const profile = await this.validator(email, password);
    if (!profile) throw new UnauthorizedException('Email or Password is not valid');

    const { isAdmin } = profile;

    return caseConvert({
      accessToken: this.jwtService.sign(user),
      isAdmin
    }, false);
  }

  sendActivationLink(email: string) {
    const key = generateHash({ length: 16 });
    this.activationKeys[key] = { email };
    sendMail(
      email,
      SUPERADMIN_SERVICE,
      'Invitation to VoteAPP',
      `You were invited to VoteAPP. Here's the link ${CLIENT_BASEURL}/activation?key=${key}`,
      `You were invited to VoteAPP.<br/>
      <a href="${CLIENT_BASEURL}/activation?key=${key}">Here's the link</a>`
    );
  }

  getUserWithActivationKey(key: string): string {
    if (!Object.prototype.hasOwnProperty.call(this.activationKeys, key)) {
      throw new BadRequestException('Activation link is not valid');
    }
    return this.activationKeys[key].email;
  }

  sendAccessKey(key: string) {
    if (!Object.prototype.hasOwnProperty.call(this.activationKeys, key)) {
      throw new BadRequestException('Activation link is not valid');
    }
    const { email } = this.activationKeys[key];
    this.activationKeys[key].accessCode = generateHash({
      length: 6,
      charset: '0123456789ABCDEF'
    });

    sendMail(
      email,
      SUPERADMIN_SERVICE,
      'Your access code',
      `Your access code is ${this.activationKeys[key].accessCode}`,
      `Your access code is ${this.activationKeys[key].accessCode}`
    );
  }

  async activate(email: string, password: string) {
    const admin = await this.adminService.findAdmin(email);
    if (admin) return await this.adminService.activate(email, password);

    const user = await this.userService.findUser(email);
    if (user) return await this.userService.activate(email, password);

    throw new NotFoundException('We cannot find the user');
  }
}
