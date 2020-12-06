import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

/* Creates a new sessios. */
sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({ email, password });

    delete user.password;

    return response.status(StatusCodes.OK).json({ user, token });
  } catch (e) {
    return response.status(StatusCodes.BAD_REQUEST).json({ erro: e.message });
  }
});

export default sessionsRouter;
