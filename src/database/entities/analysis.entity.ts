import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DemoRating } from '../../analysis/types/findTopManifestations.types';
import { DemoRatingObjDto } from '../../analysis/dto/response/create-analysis-response.dto';

@Entity()
export class Analysis {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  addressNumber: string;

  @Column()
  complement: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  postalCode: string;

  @Column('simple-json', { nullable: true })
  demostration?: DemoRatingObjDto;

  @Column('simple-json', { nullable: true })
  demoRating?: DemoRating;

  @Column('simple-array')
  characteristicIds: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
