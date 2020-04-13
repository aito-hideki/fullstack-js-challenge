import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Admin } from 'src/admin/admin.entity';
import { User } from 'src/user/user.entity';
import { Poll } from 'src/poll/poll.entity';

@Entity()
export class Paper {
  @PrimaryGeneratedColumn()
  paperId: number;

  @ManyToOne(() => Admin, admin => admin.papers, { cascade: true })
  admin: Admin;

  @ManyToOne(() => User, user => user.papers, { cascade: true })
  user: User;

  @ManyToOne(() => Poll, poll => poll.papers)
  poll: Poll;

  @Column('boolean', { array: true })
  answers: boolean[];
}
