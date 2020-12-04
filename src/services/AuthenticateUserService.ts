import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface IRequest {
  email: string,
  password: string,
}

interface IResponse {
  user: User,
  token: string,
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email or password.');
    }

    const passwordMatches = await compare(password, user?.password ?? '');

    if (!passwordMatches) {
      throw new AppError('Incorrect email or password.');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({
        role: user.role,
      },
      secret, {
        subject: user.id,
        expiresIn,
      });

    return { user, token };
  }
}

export default AuthenticateUserService;
