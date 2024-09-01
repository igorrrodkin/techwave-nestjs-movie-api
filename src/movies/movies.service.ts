import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MoviesRepository } from "../database/repositories/movies.service";
import { GenresRepository } from "src/database/repositories/genres.service";
import { CreateMovieDto } from "./dto/createMovie.dto";
import { UpdateMovieDto } from "./dto/updateMovie.dto";
import { SearchMoviesDto } from "./dto/searchMovies.dto";

@Injectable()
export class MoviesService {
    constructor(
        private moviesRepository: MoviesRepository,
        private genreRepository: GenresRepository
    ) {}

    async getAllMovies(page: number, perPage: number) {
        if (page <= 0 || perPage <= 0) {
            throw new HttpException("Page and perPage params should be above 0", HttpStatus.BAD_REQUEST);
        }
        const movies = await this.moviesRepository.getAll(page, perPage);
        return movies;
    }

    async addMovie(movie: CreateMovieDto) {
        const genresDatabaseEntities = await this.genreRepository.getByGenres(movie.genres);

        // Mismatch between genres that were sent in request and database. At least one genre not exist in the db
        if (genresDatabaseEntities.length !== movie.genres.length) {
            throw new HttpException(`Invalid genres provided. At least one genre not exist`, HttpStatus.BAD_REQUEST);
        }
        const movieId = await this.moviesRepository.insert(movie, genresDatabaseEntities);
        return { id: movieId };
    }

    async updateMovieById(id: number, updateMovie: UpdateMovieDto) {
        const movie = await this.moviesRepository.getById(id);
        if (!movie) {
            throw new HttpException("Movie not exists", HttpStatus.NOT_FOUND);
        }
        if (updateMovie.genres) {
            const { genres, ...movie } = updateMovie;
            const genresDatabaseEntities = await this.genreRepository.getByGenres(updateMovie.genres);
            // Mismatch between genres that were sent in request and database. At least one genre not exist in the db
            if (genresDatabaseEntities.length !== updateMovie.genres.length) {
                throw new HttpException(
                    `Invalid genres provided. At least one genre not exist`,
                    HttpStatus.BAD_REQUEST
                );
            }

            await this.moviesRepository.updateByIdWithGenres(id, movie, genresDatabaseEntities);
            return { id };
        }

        await this.moviesRepository.updateById(id, updateMovie);
        return { id };
    }

    async deleteMoviebyId(id: number) {
        const movie = await this.moviesRepository.getById(id);
        if (!movie) {
            throw new HttpException("Movie not exists", HttpStatus.NOT_FOUND);
        }

        await this.moviesRepository.deleteById(id);
        return { id };
    }

    async searchMovies(searchParams: SearchMoviesDto) {
        const movies = await this.moviesRepository.searchMovies(searchParams);
        return movies;
    }
}
