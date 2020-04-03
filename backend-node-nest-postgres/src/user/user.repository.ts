import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneUser = async (id: number) => {
    return this.findOneOrFail(id, { loadRelationIds: true })
  }

  createUser = async (userInfo) => {
    const { firstName, lastName, mobile } = userInfo

    return await this.create({
      firstName,
      lastName,
      mobile
    })
  }
}
