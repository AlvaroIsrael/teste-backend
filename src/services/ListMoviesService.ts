import { getCustomRepository } from 'typeorm';
import Movie from '../models/Movie';
import MoviesRepository from '../repositories/MoviesRepository';

interface IRequest {
  director: string | undefined;
  title: string | undefined;
  genres: string | undefined;
  actors: string | undefined;
}

class ListMoviesService {
  public execute = async ({ director, title, genres, actors }: IRequest): Promise<Movie[] | null> => {
    const moviesRepository = getCustomRepository(MoviesRepository);

    const movies = await moviesRepository.findMovie({ director, title, genres, actors });

    return movies;
  };
}

export default ListMoviesService;
