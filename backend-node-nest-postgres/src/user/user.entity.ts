import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, ManyToOne, OneToMany } from 'typeorm'
import { UserInfo } from 'src/user-info/user-info.entity';
import { Admin } from '../admin/admin.entity';
import { Poll } from '../poll/poll.entity';
import { Paper } from '../paper/paper.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserInfo, info => info.user)
  info: UserInfo;

  @ManyToOne(() => Admin, admin => admin.users)
  admin: Admin

  @ManyToMany(() => Poll, poll => poll.users)
  polls: Poll[]

  @OneToMany(() => Paper, paper => paper.user)
  papers: Paper[]
}
