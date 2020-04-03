import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm'
import { Paper } from 'src/paper/paper.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Paper, paper => paper.answers)
  paper: Paper

  @Column()
  question: string;

  @Column()
  sample: boolean;

  @Column()
  answer: boolean;
}
