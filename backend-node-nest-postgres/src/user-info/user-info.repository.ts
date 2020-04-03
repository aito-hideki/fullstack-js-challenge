import { UserInfo } from './user-info.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserInfo)
export class UserInfoRepository extends Repository<UserInfo> {
  getProfile = (id: number) => {
    return this.findOneOrFail(id, { loadRelationIds: true })
  }

  findProfile = (email: string) => {
    return this.findOne({ email })
  }

  createProfile = (profileInfo) => {
    const { email, password, isAdmin } = profileInfo
    
    return this.create({
      email,
      password,
      isAdmin
    })
  }
}
