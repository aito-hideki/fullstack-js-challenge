import { Injectable, ForbiddenException, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { UserRepository } from 'src/user/user.repository';
import { AuthService } from 'src/auth/auth.service';

const {
  SUPERADMIN_EMAIL,
  SUPERADMIN_PASSWORD
} = process.env

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
      email: SUPERADMIN_EMAIL,
      password: SUPERADMIN_PASSWORD,
      active: true
    })
  }

  findAdmin = async (email: string) => {
    const admin = await this.adminRepository.findOne({ email })
    return admin ? { ...admin, isAdmin: true } : null
  }

  getAllAdmins = async () => {
    return (await this.adminRepository.find()).map(profile => ({
      ...profile,
      isAdmin: true
    }))
  }

  setupProfile = async (profileInfo) => {
    const { email, password, active } = profileInfo

    const profile = this.findAdmin(email)
    const admin = await this.adminRepository.save({
      ...(profile || {}),
      email,
      password,
      active
    })

    return admin ? { ...admin, isAdmin: true } : null
  }

  updateProfile = async (profileInfo) => {
    const {
      email,
      password,
      active
    } = profileInfo

    const profile = this.findAdmin(email)
    if (!profile) throw new NotFoundException('Particular Admin not found')

    const admin = await this.adminRepository.save({
      ...profile,
      email,
      password,
      active
    })

    return admin ? { ...admin, isAdmin: true } : null
  }

  createProfile = async ({ email }) => {
    if (await this.adminRepository.count({ email }) &&
      await this.userRepository.count({ email })) {
      throw new ForbiddenException('A user with same email address already exists')
    }

    const admin = await this.adminRepository.save({ email, password: '' })
    return admin
  }

  activate = async(email: string, password: string) => {
    const profile = await this.findAdmin(email)
    if (!profile) throw new NotFoundException('Particular Admin not found')

    const admin = await this.adminRepository.save({
      ...profile,
      password,
      active: true
    })

    return admin ? { ...admin, isAdmin: true } : null
  }
}
