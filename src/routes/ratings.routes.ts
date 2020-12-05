import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import RateMovieService from '../services/RateMovieService';
import ensureAuthenticated from '../middleares/ensureAuthenticated';

const ratingsRouter = Router();

/* Inserts a new movie into database. */
ratingsRouter.post('/:score', ensureAuthenticated, async (request, response) => {
  const { score } = request.params;
  const userRole = request.user.role;
  const userId = request.user.id;
  const { movieId } = request.body;

  const rateMovie = new RateMovieService();

  try {
    const userScore = parseFloat(score);

    const movie = await rateMovie.execute({ userId, userRole, movieId, score: userScore });

    return response.status(StatusCodes.OK).json(movie);
  } catch (e) {
    if (e.message === 'Only a default users can rate a movie.') {
      return response.status(StatusCodes.UNAUTHORIZED).json({ erro: e.message });
    }
    return response.status(StatusCodes.BAD_REQUEST).json({ erro: e.message });
  }
});

export default ratingsRouter;
