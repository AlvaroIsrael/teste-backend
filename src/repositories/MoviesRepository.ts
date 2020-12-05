import { EntityRepository, Repository } from 'typeorm';
import Movie from '../models/Movie';

interface IRequest {
  director: string | undefined;
  title: string | undefined;
  genres: string | undefined;
  actors: string | undefined;
}

@EntityRepository(Movie)
class UsersRepository extends Repository<Movie> {
  public async findMovie({ director, title, genres, actors }: IRequest): Promise<Movie[] | null> {
    /* This is just a 'hack' to remove undefined properties from an object. */
    const where = JSON.parse(JSON.stringify({ director, title, genres, actors }));

    const moviesFound = await this.find({
      where: { ...where },
      relations: ['ratings'],
    });

    moviesFound.forEach(movie => {
      let total = 0;

      if (!(movie.ratings === undefined)) {
        for (let i = 0; i < movie.ratings.length; i += 1) {
          total += parseFloat((movie.ratings[i].score ?? 0).toString());
        }

        const average = total / movie.ratings.length;

        delete movie.ratings;
        delete movie.created_at;
        delete movie.updated_at;

        movie.average = Number.isNaN(average) ? 0 : average;
      }
    });

    return moviesFound || null;
  }
}

export default UsersRepository;
