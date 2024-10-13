import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Demonstrations } from './demonstrations.entity';

@Entity()
export class Causes {
  @PrimaryColumn({ type: 'char', length: 50 })
  id: string;

  @Column({ type: 'char', length: 50, nullable: false })
  name: string;

  @Column({ type: 'char', length: 50, nullable: false })
  description: string;

  @ManyToOne(() => Demonstrations, (demonstration) => demonstration.causes)
  demonstration: Demonstrations;
}
