import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Address } from './address.entity';
import { Language } from './language.entity';

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  bio: string;

  @Column({ length: 100 })
  firstName: string;

  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ type: 'text', nullable: true })
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @Column({ unique: true })
  userId: string;

  @OneToMany(() => Address, (address) => address.profile, {
    cascade: true,
    nullable: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  address: Address;

  @ManyToMany(() => Language, (language) => language.profiles, { eager: true })
  @JoinTable({
    name: 'profile_languages',
    joinColumn: { name: 'profileId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'languageId', referencedColumnName: 'id' },
  })
  languages: Language[];
}
