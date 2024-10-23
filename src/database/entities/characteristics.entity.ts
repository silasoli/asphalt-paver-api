import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Demonstrations } from './demonstrations.entity';

@Entity()
export class Characteristics {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  name: string;

  @ManyToMany(
    () => Demonstrations,
    (demonstration) => demonstration.characteristics,
  )
  @JoinTable() 
  demonstrations: Demonstrations[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
