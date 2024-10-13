import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Causes } from './causes.entity';
import { Characteristics } from './characteristics.entity';
import { Solutions } from './solutions.entity';

@Entity()
export class Demonstrations {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 50, nullable: false })
  name: string;

  @OneToMany(() => Causes, (cause) => cause.demonstration)
  causes: Causes[];

  @OneToMany(
    () => Characteristics,
    (characteristic) => characteristic.demonstration,
  )
  characteristics: Characteristics[];

  @OneToMany(() => Solutions, (solution) => solution.demonstration)
  solutions: Solutions[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
