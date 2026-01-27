import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Request, RequestStatus } from './request.entity';
import { Rating } from './rating.entity';
import { LocationEntity } from './location.entity';
import { Tenant } from './tenant.entity';

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
    cascade: ['insert', 'update'],
  })
  profile?: Profile;

  @OneToMany(() => Request, (request) => request.requestBy)
  requestsCreated?: Request[];

  @OneToMany(() => Request, (request) => request.acceptedBy)
  requestsAccepted?: Request[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings?: Rating[];

  @ManyToOne(() => LocationEntity, (location) => location.users, {
    cascade: ['insert', 'update'],
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn()
  location?: LocationEntity;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  @JoinColumn()
  tenant: Tenant;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;

  get totalCompletedRequests(): number {
    return (
      this.requestsAccepted?.filter(
        (req) => req.status === RequestStatus.COMPLETED,
      ).length ?? 0
    );
  }

  get totalOnGoingRequests(): number {
    return (
      this.requestsAccepted?.filter(
        (req) =>
          req.status !== RequestStatus.COMPLETED &&
          req.status !== RequestStatus.CANCELLED,
      ).length ?? 0
    );
  }

  get totalCancelledRequests(): number {
    return (
      this.requestsAccepted?.filter(
        (req) => req.status === RequestStatus.CANCELLED,
      ).length ?? 0
    );
  }
}
