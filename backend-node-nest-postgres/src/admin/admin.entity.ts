import { Entity, PrimaryGeneratedColumn, OneToMany, OneToOne, Column } from 'typeorm'
import { UserInfo } from 'src/user-info/user-info.entity';
import { User } from 'src/user/user.entity';
import { Poll } from 'src/poll/poll.entity';
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  adminId: number;

  @OneToOne(() => UserInfo, info => info.admin)
  info: UserInfo;

  @Column()
  firstName: string

  @Column()
  lastName: string

  @OneToMany(() => User, user => user.admin)
  users: User[]

  @OneToMany(() => Poll, poll => poll.admin)
  polls: Poll[]

  @OneToMany(() => Paper, paper => paper.admin)
  papers: Paper[]
}
