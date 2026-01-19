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
import { Location } from './location.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Request, (request) => request.chats, {
    onDelete: 'CASCADE',
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
