import Movie from '../models/Movie';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Movie)
class UsersRepository extends Repository<Movie> {

  public async findMovieByDirector(director: string): Promise<Movie | null> {
    const foundUser = await this.findOne({
      where: { director },
    });
    return foundUser || null;
  }

  public async findMovieByTitle(title: string): Promise<Movie | null> {
    const foundUser = await this.findOne({
      where: { title },
    });
    return foundUser || null;
  }

  public async findMovieByGenre(genres: string): Promise<Movie | null> {
    const foundUser = await this.findOne({
      where: { genres },
    });
    return foundUser || null;
  }

  public async findMovieByActors(actors: string): Promise<Movie | null> {
    const foundUser = await this.findOne({
      where: { actors },
    });
    return foundUser || null;
  }
}

export default UsersRepository;
