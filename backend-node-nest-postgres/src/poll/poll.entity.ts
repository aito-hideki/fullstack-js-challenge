import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne } from 'typeorm'
import { Admin } from '../admin/admin.entity';
import { User } from '../user/user.entity';
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin, admin => admin.polls)
  admin: Admin

  @ManyToMany(() => User, user => user.polls)
  users: User[]
  
  @OneToMany(() => Paper, paper => paper.poll)
  papers: Paper[]
}
