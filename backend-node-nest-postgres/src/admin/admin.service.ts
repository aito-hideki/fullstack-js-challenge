import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {
    this.adminRepository.delete({})
    this.setupProfile({
      email: 'admin@voteapp.com',
      password: 'admin0109'
    })
  }

  findAdmin = async (email: string) => {
    const admin = await this.adminRepository.findOne({ email })
    return admin ? { ...admin, isAdmin: true } : null
  }

  setupProfile = async (profileInfo) => {
    const { email } = profileInfo
    if (await this.adminRepository.count({ email })) {
      await this.updateProfile(profileInfo)
    } else {
      await this.createProfile(profileInfo)
    }
  }

  updateProfile = async (profileInfo) => {
    const { email, password } = profileInfo

    const profile = this.adminRepository.findOne({ email })
    return await this.adminRepository.save({ ...profile, email, password })
  }

  createProfile = async (profileInfo) => {
    const { email, password } = profileInfo

    const admin = await this.adminRepository.save({ email, password })
    return admin
  }
}
