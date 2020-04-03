import { Injectable } from '@nestjs/common';
import { UserInfoRepository } from './user-info.repository';
import { AdminRepository } from 'src/admin/admin.repository';
import { UserRepository } from 'src/user/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';

export type UserInfo = any;

@Injectable()
export class UserInfoService {
  private readonly users: UserInfo[];

  constructor(
    @InjectRepository(UserInfoRepository)
    private readonly userInfoRepository: UserInfoRepository,
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository
  ) {
    this.userInfoRepository.delete({ email: 'admin@crud.com' })
    this.setupProfile({
      email: 'admin@crud.com',
      password: 'admin0109',
      isAdmin: true,
      firstName: 'Aito',
      lastName: 'Hideki'
    })
  }

  async findProfile(email: string): Promise<UserInfo | undefined> {
    return await this.userInfoRepository.findProfile(email)
  }

  async setupProfile(profile) {
    console.log('--- setting up profile ---')
    const { email } = profile
    if (await this.userInfoRepository.count({ email })) {
      await this.saveProfile(profile)
    } else {
      await this.createProfile(profile)
    }
  }

  async saveProfile(profileInfo) {
    console.log('--- saving the profile ---')
    const { email, password, isAdmin } = profileInfo

    const info = await this.userInfoRepository.findProfile(email)
    const { isAdmin: wasAdmin } = info

    info.email = email
    info.password = password

    console.log('--- info ---')
    console.log(info)

    if (isAdmin) {
      if (wasAdmin) {
        console.log('yeah it was admin')
      }
    }
  }

  async createProfile(profileInfo) {
    console.log('--- creating the profile ---')
    const { isAdmin } = profileInfo
    let info

    try {
      info = await this.userInfoRepository.createProfile(profileInfo)
      console.log(info)

      if (isAdmin) {
        let admin = await this.adminRepository.createAdmin({ ...profileInfo, info })
        console.log(admin)

        await this.userInfoRepository.save({ ...info, admin: { ...admin, info } })
        await this.adminRepository.save({ ...admin, info: { ...info, admin } })

        console.log('--- admin ---')
        console.log(await(this.userInfoRepository.findOne(info.id)))
      }
    } catch (err) {
      console.log('--- error creating the file ---')
      console.log(err)
    }

    return info
  }
}
