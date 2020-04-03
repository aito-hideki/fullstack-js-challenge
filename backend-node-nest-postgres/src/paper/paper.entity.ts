import { Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { Admin } from 'src/admin/admin.entity';
import { User } from 'src/user/user.entity';
import { Poll } from 'src/poll/poll.entity';
import { Answer } from 'src/answer/answer.entity';

@Entity()
export class Paper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin, admin => admin.papers)
  admin: Admin

  @ManyToOne(() => User, user => user.papers)
  user: User

  @ManyToOne(() => Poll, poll => poll.papers)
  poll: Poll

  @OneToMany(() => Answer, answer => answer.paper)
  answers: Answer
}
