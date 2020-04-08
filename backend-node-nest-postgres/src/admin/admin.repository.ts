import { Admin } from './admin.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  exist = async (email: string) => {
    return !!(await this.count({ email }));
  }

  refactor = (admin: any) => {
    if (!admin) return admin;

    const { users } = admin;

    if (users) {
      admin = { ...admin, users: users.map(user => {
        const { password, ...userData }  = user;
        void(password);
        return userData;
      }) };
    }

    return { ...admin, isAdmin: true };
  };
}
