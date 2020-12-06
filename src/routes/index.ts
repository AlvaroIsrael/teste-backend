import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import moviesRouter from './movies.routes';
import ratingsRouter from './ratings.routes';

const routes = Router();

routes.use('/api/v1/users', usersRouter);
routes.use('/api/v1/movies', moviesRouter);
routes.use('/api/v1/ratings', ratingsRouter);
routes.use('/api/v1/sessions', sessionsRouter);

export default routes;
