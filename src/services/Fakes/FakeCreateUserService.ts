import User from '../../models/User';
import AppError from '../../errors/AppError';
import { hash } from 'bcryptjs';
import { v4 as uuid_v4 } from 'uuid';

interface IRequest {
  name: string,
  email: string,
  password: string,
  role: string;
}

class FakeCreateUserService {
  private users: User[] = [];

  public async execute({ name, email, password, role }: IRequest): Promise<User> {

    const emailExists = this.users.find(user => user.email = email);

    if (emailExists) {
      throw new AppError('Email address already taken.');
    }

    const hashedPassword = await hash(password, 8);

    const user = new User();
    user.id = uuid_v4();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;
    user.role = role;
    user.active = 1;
    user.created_at = new Date();
    user.updated_at = new Date();

    this.users.push(user);

    delete user.name;
    delete user.email;
    delete user.password;
    delete user.role;
    delete user.active;
    delete user.updated_at;

    return user;
  }
}

export default FakeCreateUserService;
