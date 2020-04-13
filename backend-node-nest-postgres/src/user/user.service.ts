import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AdminRepository } from 'src/admin/admin.repository';
import { PollRepository } from 'src/poll/poll.repository';
import { PaperRepository } from 'src/paper/paper.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository,
    @InjectRepository(PollRepository)
    private readonly pollRepository: PollRepository,
    @InjectRepository(PaperRepository)
    private readonly paperRepository: PaperRepository
  ) {
  }

  validator = async (email: string, password: string) => {
    const user = await this.userRepository.findOne({ email, password });
    return this.refactor(user);
  };

  refactor = this.userRepository.refactor

  exist = async (email: string) => {
    return !!(await this.adminRepository.count({ email }));
  };

  findUser = async (email: string) => {
    const user = await this.userRepository.findOne({ email });
    return this.refactor(user);
  };

  createProfile = async (email: string, adminEmail: string) => {
    if (await this.adminRepository.count({ email }) &&
      await this.userRepository.count({ email })) {
      throw new ForbiddenException('A user already exists');
    }

    const admin = await this.adminRepository.findOne({ email: adminEmail });

    const user = await this.userRepository.save({
      email,
      password: '',
      firstName: '',
      lastName: '',
      mobile: '',
      admin,
      active: false
    });

    return this.refactor(user);
  };

  async getUsersForAdmin(adminId: number) {
    const users = await this.userRepository.find({
      relations: ['admin'],
      where: { adminId }
    });

    return users.map(user => this.refactor(user));
  }

  activate = async(email: string, password: string) => {
    const profile = await this.findUser(email);
    if (!profile) throw new NotFoundException('Something went wrong');

    const user = await this.userRepository.save({
      ...profile,
      password,
      active: true
    });

    return this.refactor(user);
  };

  getPolls = async (userId: number) => await this.pollRepository.find({
    where: { users: { userId } }
  });

  submitAnswer = async (userId: number, pollId: number, answers: boolean[]) => {
    console.log('----------------')
    console.log(userId, pollId, answers)
    if (!await this.userRepository.count({ userId })) throw new NotFoundException('No User Found')

    const poll = await this.pollRepository.findOneOrFail({
      relations: ['users'],
      where: { pollId }
    })
    const user = await this.userRepository.findOneOrFail({
      relations: ['admin', 'polls'],
      where: { userId }
    })
    const { admin, polls } = user
    const { users } = poll

    await this.paperRepository.save({
      admin,
      user,
      poll,
      answers
    })

    await this.userRepository.save({
      userId,
      polls: polls.filter(poll => poll.pollId !== pollId)
    })
  }
}
