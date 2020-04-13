import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Poll } from 'src/poll/poll.entity';
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  adminId: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: false })
  active: boolean;

  @OneToMany(() => User, user => user.admin)
  users: User[];

  @OneToMany(() => Poll, poll => poll.admin)
  polls: Poll[];

  @OneToMany(() => Paper, paper => paper.admin)
  papers: Paper[];
}
