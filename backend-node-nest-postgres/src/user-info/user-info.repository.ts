import { UserInfo } from './user-info.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserInfo)
export class UserInfoRepository extends Repository<UserInfo> {
  findOneProfile = async (id: number) => {
    return this.findOneOrFail(id, { loadRelationIds: true })
  }
}
