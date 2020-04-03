import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm'
import { UserInfo } from 'src/user-info/user-info.entity';
import { User } from '../user/user.entity';
import { Poll } from '../poll/poll.entity';
import { Paper } from '../paper/paper.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserInfo, info => info.admin)
  info: UserInfo;

  @OneToMany(() => User, user => user.admin)
  users: User[]

  @OneToMany(() => Poll, poll => poll.admin)
  polls: Poll[]

  @OneToMany(() => Paper, paper => paper.admin)
  papers: Paper[]
}
