import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import CreateMovieService from '../services/CreateMovieService';
import ensureAuthenticated from '../middleares/ensureAuthenticated';
import ListMoviesService from '../services/ListMoviesService';

const moviesRouter = Router();

/* Inserts a new movie into database. */
moviesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { title, director, genres, actors, plot, language, country } = request.body;

  if (!(request.user.role === 'admin')) {
    return response.status(StatusCodes.UNAUTHORIZED).json({ erro: 'Only a admin can add a movie.' });
  }

  const createMovie = new CreateMovieService();

  try {
    const movie = await createMovie.execute({
      title,
      director,
      genres,
      actors,
      plot,
      language,
      country,
    });

    return response.status(StatusCodes.OK).json(movie);
  } catch (e) {
    return response.status(StatusCodes.BAD_REQUEST).json({ erro: e.message });
  }
});

/* List movies, possible query params: director, title, genre, actor. */
moviesRouter.get('/', async (request, response) => {
  const director = request.query.director as string;
  const title = request.query.title as string;
  const genres = request.query.genres as string;
  const actors = request.query.actors as string;

  const listMovies = new ListMoviesService();

  const movies = await listMovies.execute({ director, title, genres, actors });

  return response.status(200).json(movies);
});

export default moviesRouter;
