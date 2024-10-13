import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Causes } from './causes.entity';
import { Characteristics } from './characteristics.entity';
import { Solutions } from './solutions.entity';

@Entity()
export class Demonstrations {
  @PrimaryColumn({ type: 'char', length: 50 })
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
}
