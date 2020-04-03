import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Admin } from '../admin/admin.entity';
import { User } from '../user/user.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToOne(() => Admin, admin => admin.info, { nullable: true })
  admin: Admin

  @OneToOne(() => User, user => user.info, { nullable: true })
  user: User
}
