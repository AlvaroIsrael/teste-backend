import { getRepository } from 'typeorm';
import Movie from '../models/Movie';
import AppError from '../errors/AppError';

interface IRequest {
  title: string;
  director: string;
  genres: string;
  actors: string;
  plot: string;
  language: string;
  country: string;
}

class CreateMovieService {
  public execute = async ({ title, director, genres, actors, plot, language, country }: IRequest): Promise<Movie> => {
    const movieRepository = getRepository(Movie);

    const movieExists = await movieRepository.findOne({
      where: { title },
    });

    if (movieExists) {
      throw new AppError('Movie already exists in our database.');
    }

    const movie = movieRepository.create({
      title,
      director,
      genres,
      actors,
      plot,
      language,
      country,
    });

    await movieRepository.save(movie);

    return movie;
  };
}

export default CreateMovieService;
