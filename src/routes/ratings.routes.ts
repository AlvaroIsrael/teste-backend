import { Router } from 'express';
import RateMovieService from '../services/RateMovieService';
import * as StatusCodes from 'http-status-codes';
import ensureAuthenticated from '../middleares/ensureAuthenticated';

const ratingsRouter = Router();

/* Inserts a new movie into database. */
ratingsRouter.post('/:score', ensureAuthenticated, async (request, response) => {
  const score = request.params.score;
  const userRole = request.user.role;

  if (!(request.user.role != 'admin')) {
    return response.status(StatusCodes.UNAUTHORIZED).json({
      erro: 'Only a default users can rate a movie.',
    });
  }

  const rateMovie = new RateMovieService();

  try {
    const movie = await rateMovie.execute({
      title, director, genre, actors, plot, language, country,
    });

    return response.status(StatusCodes.OK).json(movie);
  } catch (e) {
    return response.status(StatusCodes.BAD_REQUEST).json({ erro: e.message });
  }
});

export default ratingsRouter;
