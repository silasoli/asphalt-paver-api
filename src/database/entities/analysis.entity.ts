import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Analysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  characteristicIds: string[];

  @CreateDateColumn()
  createdAt: Date;
}
