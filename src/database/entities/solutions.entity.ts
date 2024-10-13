import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Demonstrations } from './demonstrations.entity';

@Entity()
export class Solutions {
  @PrimaryColumn({ type: 'char', length: 50 })
  id: string;

  @Column({ type: 'char', length: 50, nullable: false })
  description: string;

  @Column({ type: 'char', length: 50, nullable: false })
  name: string;

  @ManyToOne(() => Demonstrations, (demonstration) => demonstration.solutions)
  demonstration: Demonstrations;
}
