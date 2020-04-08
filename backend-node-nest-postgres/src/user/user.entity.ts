import { Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany, Column, JoinColumn } from 'typeorm';
import { Admin } from 'src/admin/admin.entity';
import { Poll } from 'src/poll/poll.entity';
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin, admin => admin.users)
  admin: Admin;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: '' })
  firstName: string;

  @Column({ default: '' })
  lastName: string;

  @Column({ default: '' })
  mobile: string;

  @Column({ default: false })
  active: boolean;

  @ManyToMany(() => Poll, poll => poll.users)
  polls: Poll[];

  @OneToMany(() => Paper, paper => paper.user)
  papers: Paper[];
}
