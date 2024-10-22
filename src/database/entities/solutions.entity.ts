import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Demonstrations } from './demonstrations.entity';

@Entity()
export class Solutions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({  nullable: false })
  description: string;

  @Column({  nullable: false })
  name: string;

  @ManyToOne(() => Demonstrations, (demonstration) => demonstration.solutions, {
    onDelete: 'CASCADE',
  })
  demonstration: Demonstrations;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
