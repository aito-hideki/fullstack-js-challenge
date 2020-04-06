import { Entity, PrimaryGeneratedColumn, ManyToMany, ManyToOne, OneToMany, Column } from 'typeorm'
import { Admin } from 'src/admin/admin.entity';
import { Poll } from 'src/poll/poll.entity';
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Admin, admin => admin.users)
  admin: Admin

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  password: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ nullable: true })
  mobile: string

  @ManyToMany(() => Poll, poll => poll.users)
  polls: Poll[]

  @OneToMany(() => Paper, paper => paper.user)
  papers: Paper[]
}
