import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
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
