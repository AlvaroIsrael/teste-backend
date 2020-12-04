import AppError from '../errors/AppError';
import CreateUserService from '../services/CreateUserService';
import '../database';

describe('Create User Service', () => {
  it('Should be able to create a new user.', async () => {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name: 'alvaro',
      email: 'teste@teste.com',
      password: 'mystrongpassword',
      role: 'admin',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('created_at');
  });

  it('Should not be able to create a new user if the email is already taken.', async () => {
    const createUserService = new CreateUserService();

    try {
      const user1 = await createUserService.execute({
        name: 'alvaro',
        email: 'teste@teste.com',
        password: 'mystrongpassword',
        role: 'admin',
      });

      const user2 = await createUserService.execute({
        name: 'alvaro',
        email: 'teste@teste.com',
        password: 'mystrongpassword',
        role: 'admin',
      });
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
    }
  });
});

