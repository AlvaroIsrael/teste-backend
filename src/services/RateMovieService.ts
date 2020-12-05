import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Rating from '../models/Rating';
import Movie from '../models/Movie';

interface IRequest {
  userId: string;
  movieId: string;
  userRole: string;
  score: number;
}

const between = (x: number, min: number, max: number) => {
  return x >= min && x <= max;
};

class RateMovieService {
  public execute = async ({ userId, userRole, movieId, score }: IRequest): Promise<Rating> => {
    if (!(userRole !== 'admin')) {
      throw new AppError('Only a default users can rate a movie.');
    }

    if (!between(score, 0, 4)) {
      throw new AppError('Score must be a number between 0 and 4.');
    }

    const moviesRepository = getRepository(Movie);

    const movie = await moviesRepository.findOne({
      where: { id: movieId },
    });

    if (!movie) {
      throw new AppError('This movies does not exist in the database.');
    }

    const usersRepository = getRepository(Rating);

    const rating = usersRepository.create({
      user_id: userId,
      movie_id: movieId,
      score,
    });

    await usersRepository.save(rating);

    delete rating.user_id;
    delete rating.movie_id;
    delete rating.updated_at;

    return rating;
  };
}

export default RateMovieService;
