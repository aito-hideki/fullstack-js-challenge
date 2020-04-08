import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findOneUser = async (id: number) => {
    return this.findOneOrFail(id, { loadRelationIds: true });
  };

  createUser = async (profileInfo) => {
    const { email, password, firstName, lastName, mobile, admin } = profileInfo;

    return await this.save({
      email,
      password,
      firstName,
      lastName,
      mobile,
      admin,
      active: false
    });
  };
}
