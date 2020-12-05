import AppError from '../errors/AppError';
import FakeCreateUserService from '../services/Fakes/FakeCreateUserService';

describe('Create User Service', () => {
  it('Should be able to create a new user.', async () => {
    const fakeCreateUserService = new FakeCreateUserService();

    const user = await fakeCreateUserService.execute({
      name: 'alvaro',
      email: 'teste@teste.com',
      password: 'mystrongpassword',
      role: 'admin',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('created_at');
  });

  it('Should not be able to create a new user if the email is already taken.', async () => {
    const fakeCreateUserService = new FakeCreateUserService();

    try {
      await fakeCreateUserService.execute({
        name: 'alvaro',
        email: 'teste@teste.com',
        password: 'mystrongpassword',
        role: 'admin',
      });

      await fakeCreateUserService.execute({
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

