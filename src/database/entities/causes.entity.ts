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
export class Causes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 50, nullable: false })
  name: string;

  @Column({ type: 'char', length: 50, nullable: false })
  description: string;

  @ManyToOne(() => Demonstrations, (demonstration) => demonstration.causes, {
    onDelete: 'CASCADE',
  })
  demonstration: Demonstrations;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
