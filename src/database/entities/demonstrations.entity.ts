import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Causes } from './causes.entity';
import { Characteristics } from './characteristics.entity';
import { Solutions } from './solutions.entity';

@Entity()
export class Demonstrations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Causes, (cause) => cause.demonstration)
  causes: Causes[];

  @ManyToMany(
    () => Characteristics,
    (characteristic) => characteristic.demonstrations,
  )
  characteristics: Characteristics[];

  @OneToMany(() => Solutions, (solution) => solution.demonstration)
  solutions: Solutions[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
