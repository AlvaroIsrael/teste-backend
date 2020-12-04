import { Router } from 'express';
import CreateMovieService from '../services/CreateMovieService';
import * as StatusCodes from 'http-status-codes';
import ensureAuthenticated from '../middleares/ensureAuthenticated';

const moviesRouter = Router();

/* Inserts a new movie into database. */
moviesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { title, director, genre, actors, plot, language, country } = request.body;

  if (!(request.user.role == 'admin')) {
    return response.status(StatusCodes.UNAUTHORIZED).json({ erro: 'Only a admin can add a movie.' });
  }

  const createMovie = new CreateMovieService();

  try {
    const movie = await createMovie.execute({
      title, director, genre, actors, plot, language, country,
    });

    return response.status(StatusCodes.OK).json(movie);
  } catch (e) {
    return response.status(StatusCodes.BAD_REQUEST).json({ erro: e.message });
  }
});

export default moviesRouter;
