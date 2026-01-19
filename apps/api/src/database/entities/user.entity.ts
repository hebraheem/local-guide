import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Request } from './request.entity';
import { Rating } from './rating.entity';
import { Location } from './location.entity';
import { Tenant } from './tenant.entity';
import { Message } from './message.entity';

export enum Role {
  HELPER = 'HELPER',
  REQUESTER = 'REQUESTER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    type: 'simple-array',
    default: [Role.REQUESTER],
  })
  roles: Role[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastLogin: Date;

  @Column({ default: 0.0 })
  avgRating: number;

  @Column({ default: 0 })
  reviews: number;

  @Column({ default: 0 })
  totalHelped: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  profile?: Profile;

  @OneToMany(() => Request, (request) => request.requestBy)
  requestsCreated: Request[];

  @OneToMany(() => Request, (request) => request.acceptedBy)
  requestsAccepted: Request[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @OneToMany(() => Location, (location) => location.users, {
    nullable: true,
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn()
  location: Location;

  @OneToMany(() => Tenant, (tenant) => tenant.users, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  tenant: Tenant;

  @Column({ unique: true })
  tenantId: string;
}
