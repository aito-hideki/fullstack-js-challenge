import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  exist = async (email: string, adminId?: number) => {
    return !!(await this.count({ where: { email, adminId } }));
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
