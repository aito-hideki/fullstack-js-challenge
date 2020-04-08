import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  exist = async (email: string) => {
    return !!(await this.count({ email }));
  }

  refactor = (user: any) => {
    if (!user) return user;
    const { admin } = user;

    if (admin) {
      const { password, ...adminData } = admin;
      void(password);
      user = { ...user, admin: adminData};
    }

    return { ...user, isAdmin: false };
  };
}
