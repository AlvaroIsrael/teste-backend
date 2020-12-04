import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from './User';
import Movie from './Movie';

@Entity('ratings')
class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  user_id?: string;
  @ManyToOne(() => User, user => user.ratings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @PrimaryColumn()
  movie_id?: string;
  @ManyToOne(() => Movie, movie => movie.ratings)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column('numeric')
  score?: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export default Rating;
