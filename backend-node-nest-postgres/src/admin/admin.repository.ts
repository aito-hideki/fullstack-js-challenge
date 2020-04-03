import { Admin } from './admin.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  findOneAdmin = async (id: number) => {
    return this.findOneOrFail(id, { loadRelationIds: true })
  }

  createAdmin = async (adminInfo) => {
    const { firstName, lastName, info } = adminInfo

    return await this.create({
      firstName,
      lastName,
      info
    })
  }
}
