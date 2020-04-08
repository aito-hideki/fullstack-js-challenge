import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, Column } from 'typeorm';
import { Admin } from 'src/admin/admin.entity';
import { User } from 'src/user/user.entity';
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  pollId: number;

  @Column()
  name: string;

  @Column({ default: 0 })
  invite: number;

  @Column({ default: 0 })
  answer: number;

  @Column('simple-array', { default: [] })
  questions: string[];

  @ManyToOne(() => Admin, admin => admin.polls)
  admin: Admin;

  @ManyToMany(() => User, user => user.polls)
  users: User[];
  
  @OneToMany(() => Paper, paper => paper.poll)
  papers: Paper[];
}
