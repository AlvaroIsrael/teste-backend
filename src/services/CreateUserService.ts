import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string,
  email: string,
  password: string,
  role: string;
}

class CreateUserService {
  public async execute({ name, email, password, role }: IRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const emailExists = await usersRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppError('Email address already taken.');
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name, email, password: hashedPassword, role, active: 1,
    });

    await usersRepository.save(user);

    delete user.name;
    delete user.email;
    delete user.password;
    delete user.role;
    delete user.active;
    delete user.updated_at;

    return user;
  }
}

export default CreateUserService;
