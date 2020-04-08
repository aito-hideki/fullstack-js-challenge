import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AdminRepository } from 'src/admin/admin.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository
  ) {
    this.userRepository.delete({});
  }

  findUser = async (email: string) => {
    const user = await this.userRepository.findOne({ email });
    return user ? { ...user, isAdmin: false } : null;
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

    return res;
  };

  async getUsersForAdmin(adminId: number) {
    return (await this.userRepository.find({
      relations: ['admin'],
      where: { adminId }
    })).map(user => ({ ...user, isAdmin: false }));
  }

  activate = async(email: string, password: string) => {
    const profile = await this.findUser(email);
    if (!profile) throw new NotFoundException('Something went wrong');

    const user = await this.userRepository.save({
      ...profile,
      password,
      active: true
    });

    return user ? { ...user, isAdmin: false } : null;
  };
}
