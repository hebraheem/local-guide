import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Address } from './address.entity';

enum Proficiency {
  BASIC = 'BASIC',
  CONVERSATIONAL = 'CONVERSATIONAL',
  FLUENT = 'FLUENT',
  NATIVE = 'NATIVE',
}
export class Language {
  name: string;
  proficiency: Proficiency;
}
@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ length: 100, nullable: true })
  firstName?: string;

  @Column({ length: 100, nullable: true })
  lastName?: string;

  @Column({ length: 20, nullable: true })
  phone?: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'json', nullable: true })
  languages: Language[];

  @OneToOne(() => User, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToOne(() => Address, (address) => address.profiles, {
    cascade: ['insert', 'update'],
  })
  address: Address;
}
