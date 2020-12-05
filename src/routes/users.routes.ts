import { Router } from 'express';
import * as StatusCodes from 'http-status-codes';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import ensureAuthenticated from '../middleares/ensureAuthenticated';
import UpdateUserService from '../services/UpdateUserService';

const usersRouter = Router();

/* Creates a new user. */
usersRouter.post('/', async (request, response) => {
  const { name, email, password, role } = request.body;
  const createUser = new CreateUserService();

  try {
    const user = await createUser.execute({ name, email, password, role });

    return response.status(StatusCodes.OK).json(user);
  } catch (e) {
    return response.status(StatusCodes.BAD_REQUEST).json({ erro: e.message });
  }
});

/* Updates a user. */
usersRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;
  const currentUserRole = request.user.role;
  const { name, password, role } = request.body;

  const updateUser = new UpdateUserService();

  try {
    await updateUser.execute({ id, name, password, role, currentUserRole });

    return response.status(StatusCodes.NO_CONTENT).json();
  } catch (e) {
    if (e.message === 'Only admin can update roles.') {
      return response.status(StatusCodes.UNAUTHORIZED).json({ erro: e.message });
    }
    return response.status(StatusCodes.BAD_REQUEST).json({ erro: e.message });
  }
});

/* Deletes a user. */
usersRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  if (!(request.user.role === 'admin')) {
    return response.status(StatusCodes.UNAUTHORIZED).json({ erro: 'Only a admin can disable a user.' });
  }

  const usersRepository = getRepository(User);

  try {
    await usersRepository.update(id, { active: 0 });

    return response.status(StatusCodes.NO_CONTENT).json();
  } catch (e) {
    return response.status(StatusCodes.BAD_REQUEST).json({ erro: e.message });
  }
});

export default usersRouter;
