import Movie from '../models/Movie';
import MoviesRepository from '../repositories/MoviesRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  director: string | undefined;
  title: string | undefined;
  genres: string | undefined;
  actors: string | undefined;
}

class ListMoviesService {

  public async execute({ director, title, genres, actors }: IRequest): Promise<Movie[] | null> {
    let movies: Movie[] | null;

    const moviesRepository = getCustomRepository(MoviesRepository);

    movies = await moviesRepository.findMovie({ director, title, genres, actors });

    return movies;
  }
}

export default ListMoviesService;
