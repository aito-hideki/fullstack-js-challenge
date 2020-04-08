import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  exist = async (email: string) => {
    return !!(await this.count({ email }));
  }
}
