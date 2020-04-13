import { Entity, PrimaryGeneratedColumn, ManyToMany, OneToMany, ManyToOne, Column, JoinTable } from 'typeorm';
import { Admin } from 'src/admin/admin.entity';
import { User } from 'src/user/user.entity';
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  pollId: number;

  @ManyToOne(() => Admin, admin => admin.polls, { cascade: true })
  admin: Admin;

  @Column()
  name: string;

  @Column('simple-array', { default: [] })
  questions: string[];

  @ManyToMany(() => User, user => user.polls)
  @JoinTable({
    name: 'user_poll',
    joinColumns: [{ name: 'pollId' }],
    inverseJoinColumns: [{ name: 'userId' }]
  })
  users: User[];
  
  @OneToMany(() => Paper, paper => paper.poll)
  papers: Paper[];
}
