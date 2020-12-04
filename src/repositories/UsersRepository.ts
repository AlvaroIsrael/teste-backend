import User from '../models/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  /* Find one auction item from the database. */
  public async findUserByEmail(email: string): Promise<User | null> {
    const foundUser = await this.findOne({
      where: { email },
    });
    return foundUser || null;
  }
}

export default UsersRepository;
