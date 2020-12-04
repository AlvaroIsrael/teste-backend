import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Rating from './Rating';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name?: string;

  @Column('varchar')
  email?: string;

  @Column('varchar')
  password?: string;

  @Column('varchar')
  role?: string;

  @Column('bit')
  active?: 0 | 1;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @OneToMany(() => Rating, rating => rating.user)
  ratings: Rating[];
}

export default User;
