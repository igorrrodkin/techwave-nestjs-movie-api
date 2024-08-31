import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MoviesRepository } from '../database/repositories/movies.service';
import { GenresRepository } from 'src/database/repositories/genres.service';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { SearchMoviesDto } from './dto/searchMovies.dto';

@Injectable()
export class MoviesService {
  constructor(
    private moviesRepository: MoviesRepository,
    private genreRepository: GenresRepository
  ) {}

  async getAllMovies(page: number, perPage: number) {
    const movies = await this.moviesRepository.getAll(page, perPage);
    return movies;
  }

  async addMovie(movie: CreateMovieDto) {
    const genresEntities = await this.genreRepository.getByGenres(movie.genres);

    // Mismatch between genres that were sent in request and database. At least one genre not exist in the db
    if (genresEntities.length !== movie.genres.length) {
      throw new HttpException(
        `Invalid genres provided. At least one genre not exist`,
        HttpStatus.BAD_REQUEST
      );
    }
    const genreIds = genresEntities.map((g) => {
      return { genreId: g.id };
    });
    const movieId = await this.moviesRepository.insert(movie, genreIds);
    return { id: movieId };
  }

  async updateMovieById(id: number, updateMovie: UpdateMovieDto) {
    const movie = await this.moviesRepository.getById(id);
    if (!movie) {
      throw new HttpException('Movie not exist', HttpStatus.NOT_FOUND);
    }
    if (updateMovie.genres) {
      const { genres, ...movie } = updateMovie;
      const genresEntities = await this.genreRepository.getByGenres(
        updateMovie.genres
      );

      // Mismatch between genres that were sent in request and database. At least one genre not exist in the db
      if (genresEntities.length !== updateMovie.genres.length) {
        throw new HttpException(
          `Invalid genres provided. At least one genre not exist`,
          HttpStatus.BAD_REQUEST
        );
      }

      const genreIds = genresEntities.map((g) => {
        return { genreId: g.id };
      });
      await this.moviesRepository.updateByIdWithGenres(id, movie, genreIds);
      return { id };
    }

    await this.moviesRepository.updateById(id, updateMovie);
    return { id };
  }

  async deleteMoviebyId(id: number) {
    const movie = await this.moviesRepository.getById(id);
    if (!movie) {
      throw new HttpException('Movie not exist', HttpStatus.NOT_FOUND);
    }

    await this.moviesRepository.deleteById(id);
    return { id };
  }

  async searchMovies(searchParams: SearchMoviesDto) {
    const movies = await this.moviesRepository.searchMovies(searchParams);
    return movies;
  }
}
