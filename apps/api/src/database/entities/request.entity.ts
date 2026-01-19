import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Category } from './category.entity';
import { RequestLocation } from './request-location.entity';
import { Chat } from './chat.entity';
import { Payment } from './payment.entity';

export enum RequestStatus {
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum RequestMode {
  FREE = 'FREE',
  PAID = 'PAID',
}

@Entity('requests')
export class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.CREATED,
  })
  status: RequestStatus;

  @Column({
    type: 'enum',
    enum: RequestMode,
    default: RequestMode.FREE,
  })
  mode: RequestMode;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.requests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  category: Category;

  @Column()
  categoryId: string;

  @ManyToOne(() => RequestLocation, (location) => location.requests, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  location: RequestLocation;

  @Column()
  locationId: string;

  @ManyToOne(() => User, (user) => user.requestsCreated, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  requestBy: User;

  @Column()
  requestById: string;

  @ManyToOne(() => User, (user) => user.requestsAccepted, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  acceptedBy: User;

  @Column({ nullable: true })
  acceptedById: string;

  @OneToMany(() => Chat, (chat) => chat.request, {
    cascade: true,
  })
  chats: Chat[];

  @OneToOne(() => Payment, (payment) => payment.request, {
    cascade: true,
    nullable: true,
  })
  payment: Payment;
}
