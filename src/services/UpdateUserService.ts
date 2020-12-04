import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface IRequest {
  id: string,
  name: string,
  email: string,
  password: string,
  role: string,
  currentUserRole: string,
}

class UpdateUserService {
  public async execute({ id, name, email, password, role, currentUserRole }: IRequest): Promise<number> {
    const usersRepository = getRepository(User);
    let updateSuccessful: number;

    if (role) {
      console.log('opa');
      if (!(currentUserRole == 'admin')) {
        throw new AppError('Only admin can update roles.');
      }
      const { affected } = await usersRepository.update(id, { name, email, password, role });
      updateSuccessful = affected == undefined ? 0 : affected;
    }

    const { affected } = await usersRepository.update(id, { name, email, password });

    updateSuccessful = affected == undefined ? 0 : affected;

    return updateSuccessful;
  }
}

export default UpdateUserService;
