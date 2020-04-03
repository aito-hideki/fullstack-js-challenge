import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, ManyToOne, OneToMany, Column } from 'typeorm'
import { UserInfo } from 'src/user-info/user-info.entity';
import { Admin } from 'src/admin/admin.entity';
import { Poll } from 'src/poll/poll.entity';
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserInfo, info => info.user)
  info: UserInfo;

  @ManyToOne(() => Admin, admin => admin.users)
  admin: Admin

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  mobile: string

  @ManyToMany(() => Poll, poll => poll.users)
  polls: Poll[]

  @OneToMany(() => Paper, paper => paper.user)
  papers: Paper[]
}
