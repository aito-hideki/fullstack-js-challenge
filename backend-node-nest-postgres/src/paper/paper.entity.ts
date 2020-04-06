import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm'
import { Admin } from 'src/admin/admin.entity';
import { User } from 'src/user/user.entity';
import { Poll } from 'src/poll/poll.entity';

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

  @Column('boolean', { array: true })
  answers: boolean[]
}
