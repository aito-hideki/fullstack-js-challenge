import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Admin } from 'src/admin/admin.entity';
import { User } from 'src/user/user.entity';

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

  @OneToOne(() => Admin, ({ info }) => info, { nullable: true })
  admin: Admin

  @OneToOne(() => User, ({ info }) => info, { nullable: true })
  user: User
}
