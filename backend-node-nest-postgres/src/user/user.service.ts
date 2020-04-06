import { Injectable } from '@nestjs/common';
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
    this.userRepository.delete({})
  }

  findUser = async (email: string) => {
    const user = await this.userRepository.findOne({ email })
    return user ? { ...user, isAdmin: false } : null
  }
}
