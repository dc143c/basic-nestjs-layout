import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Business } from './business.entity';
import { Role } from '../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  firstName: string;

  @Column({ unique: true })
  lastName: string;

  @Column()
  password: string;

  @Column({ default: null, nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.User, Role.Admin],
  })
  roles: Role[];

  @ManyToOne(() => Business, (business) => business.users)
  business: Business;
}
