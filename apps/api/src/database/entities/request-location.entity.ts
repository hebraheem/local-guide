import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Request } from './request.entity';

@Entity('request_locations')
export class RequestLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', nullable: true })
  latitude: number;

  @Column({ type: 'float', nullable: true })
  longitude: number;

  @Column({ type: 'text' })
  city: string;

  @Column({ type: 'text' })
  street: string;

  @Column({ type: 'text' })
  state: string;

  @Column({ type: 'text' })
  country: string;

  @Column({ type: 'text' })
  zipCode: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Request, (request) => request.location)
  requests: Request[];
}
