import { Admin } from './admin.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  exist = async (email: string) => {
    return !!(await this.count({ email }));
  }
}
