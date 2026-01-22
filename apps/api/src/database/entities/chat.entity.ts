import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Request } from './request.entity';
import { Message } from './message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Request, (request) => request.chats, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  request: Request;

  @Column()
  requestId: string;

  @OneToMany(() => Message, (message) => message.chat, {
    cascade: true,
  })
  messages: Message[];
}
