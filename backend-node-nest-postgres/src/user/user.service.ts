import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AdminRepository } from 'src/admin/admin.repository';
import { PollRepository } from 'src/poll/poll.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository,
    @InjectRepository(PollRepository)
    private readonly pollRepository: PollRepository
  ) {
    this.userRepository.delete({});
  }

  validator = async (email: string, password: string) => {
    const user = await this.userRepository.findOne({ email, password });
    return this.refactor(user);
  };

  refactor = this.userRepository.refactor

  exist = async (email: string) => {
    return !!(await this.adminRepository.count({ email }));
  };

  findUser = async (email: string) => {
    const user = await this.userRepository.findOne({ email });
    return this.refactor(user);
  };

  createProfile = async (email: string, adminEmail: string) => {
    if (await this.adminRepository.count({ email }) &&
      await this.userRepository.count({ email })) {
      throw new ForbiddenException('A user already exists');
    }

    const admin = await this.adminRepository.findOne({ email: adminEmail });

    const user = await this.userRepository.save({
      email,
      password: '',
      firstName: '',
      lastName: '',
      mobile: '',
      admin,
      active: false
    });

    const { users = [] } = admin;
    admin.users = [...users, user];
    await this.adminRepository.save(admin);

    const res = await this.userRepository.findOne({
      relations: ['admin'],
      where: { email }
    });

    return this.refactor(res);
  };

  async getUsersForAdmin(adminId: number) {
    const users = await this.userRepository.find({
      relations: ['admin'],
      where: { adminId }
    });

    return users.map(user => this.refactor(user));
  }

  activate = async(email: string, password: string) => {
    const profile = await this.findUser(email);
    if (!profile) throw new NotFoundException('Something went wrong');

    const user = await this.userRepository.save({
      ...profile,
      password,
      active: true
    });

    return this.refactor(user);
  };

  getPolls = async (userId: number) => await this.pollRepository.find({
    where: { userId }
  });
}
