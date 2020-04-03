import { Injectable } from '@nestjs/common';

export type UserInfo = any;

@Injectable()
export class UserInfoService {
  private readonly users: UserInfo[];

  constructor() {
    this.users = [
      {
        id: 1,
        username: 'root',
        password: 'admin'
      }
    ]
  }

  async findOne(username: string): Promise<UserInfo | undefined> {
    return this.users.find(user => user.username === username);
  }
}
