import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Rating from './Rating';

@Entity('movies')
class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  title?: string;

  @Column('varchar')
  director?: string;

  @Column('varchar')
  genres?: string;

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

  @OneToMany(() => Rating, rating => rating.movie)
  ratings?: Rating[];

  average?: number;
}

export default Movie;
