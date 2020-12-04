import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}

export default User;
