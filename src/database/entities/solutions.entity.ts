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

  @Column({ type: 'char', length: 50, nullable: false })
  description: string;

  @Column({ type: 'char', length: 50, nullable: false })
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
