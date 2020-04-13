import { Injectable, ForbiddenException, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { UserRepository } from 'src/user/user.repository';
import { PollRepository } from 'src/poll/poll.repository';
import { sendMail } from 'src/utils/mailer';

const { SUPERADMIN_SERVICE, CLIENT_BASEURL } = process.env;

const {
  SUPERADMIN_EMAIL,
  SUPERADMIN_PASSWORD
} = process.env;

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminRepository)
    private readonly adminRepository: AdminRepository,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(PollRepository)
    private readonly pollRepository: PollRepository
  ) {
    this.setupProfile({
      email: SUPERADMIN_EMAIL,
      password: SUPERADMIN_PASSWORD,
      active: true
    });
  }

  exist = async (email: string) => {
    return !!(await this.adminRepository.exist(email));
  };

  validator = async (email: string, password: string) => {
    const admin = await this.adminRepository.findOne({ email, password });
    return this.refactor(admin);
  };

  refactor = this.adminRepository.refactor

  findAdmin = async (email: string) => {
    const admin = await this.adminRepository.findOne({ email });
    return this.refactor(admin);
  };

  getAllAdmins = async () => {
    const admins = await this.adminRepository.find();
    return admins.map(admin => this.refactor(admin));
  };

  setupProfile = async ({ email, password, active }: any) => {
    if (await this.exist(email)) return;

    const admin = await this.adminRepository.save({
      email,
      password,
      active
    });

    return this.refactor(admin);
  };

  createProfile = async (email: string) => {
    if (await this.adminRepository.count({ email }) &&
      await this.userRepository.count({ email })) {
      throw new ForbiddenException('A user already exists');
    }

    const admin = await this.adminRepository.save({ email, password: '' });
    return admin;
  };

  activate = async(email: string, password: string) => {
    const profile = await this.findAdmin(email);
    if (!profile) throw new NotFoundException('Something went wrong');

    const admin = await this.adminRepository.save({
      ...profile,
      password,
      active: true
    });

    return this.refactor(admin);
  };
  
  createPoll = async (adminId: number, name: string, questions: string[]) => {
    const admin = await this.adminRepository.findOneOrFail({
      relations: ['polls'],
      where: { adminId }
    })
    const poll = await this.pollRepository.save({
      name,
      questions,
      admin
    })

    return poll;
  }

  getPolls = async (adminId: number) => {
    return await this.pollRepository.find({
      relations: ['users', 'papers'],
      where: { adminId }
    });
  }

  inviteToPoll = async (adminId: number, pollId: number, email: string) => {
    if (!await this.userRepository.exist(email, adminId)) throw new NotFoundException('No User Found')

    const poll = await this.pollRepository.findOneOrFail(pollId)
    const user = await this.userRepository.findOneOrFail({
      relations: ['polls'],
      where: { email }
    })

    if (user.polls.filter(p => p.pollId === poll.pollId)) {
      throw new UnprocessableEntityException('This user is already invited to the poll.')
    }

    user.polls.push(poll)
    await this.userRepository.save(user)

    sendMail(
      email,
      SUPERADMIN_SERVICE,
      'Please answer this Poll',
      `Answer the Poll "${poll.name}"`,
      `Answer the Poll - <strong>${poll.name}</strong><br />
      <a href="${CLIENT_BASEURL}/user-polls">Here's the link</a>`
    );
  }
}
