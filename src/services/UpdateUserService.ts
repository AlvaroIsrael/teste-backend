import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface IRequest {
  id: string;
  name: string;
  password: string;
  role: string;
  currentUserRole: string;
}

class UpdateUserService {
  public execute = async ({ id, name, password, role, currentUserRole }: IRequest): Promise<number> => {
    let updateSuccessful: number;
    const usersRepository = getRepository(User);

    if (role) {
      if (!(currentUserRole === 'admin')) {
        throw new AppError('Only admin can update roles.');
      }
      const { affected } = await usersRepository.update(id, { name, password, role });
      updateSuccessful = affected === undefined ? 0 : affected;
    }

    const { affected } = await usersRepository.update(id, { name, password });

    updateSuccessful = affected === undefined ? 0 : affected;

    return updateSuccessful;
  };
}

export default UpdateUserService;
