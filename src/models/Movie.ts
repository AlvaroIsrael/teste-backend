import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('movies')
class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title?: string;

  @Column('varchar')
  director?: string;

  @Column('varchar')
  genre?: string;

  @Column('varchar')
  actors?: string;

  @Column('varchar')
  plot?: string;

  @Column('varchar')
  language?: string;

  @Column('varchar')
  country?: string;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Movie;
