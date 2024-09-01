import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateMovieDto } from "src/movies/dto/createMovie.dto";
import { UpdateMovieDto } from "src/movies/dto/updateMovie.dto";
import { SearchMoviesDto } from "src/movies/dto/searchMovies.dto";
import { Genre } from "@prisma/client";

@Injectable()
export class MoviesRepository {
    constructor(private prisma: PrismaService) {}

    async getAll(page?: number, perPage?: number) {
        const data = await this.prisma.movie.findMany({
            include: { moviesToGenres: { include: { genre: {} } } },
            orderBy: { id: "desc" },
            skip: (page - 1) * perPage,
            take: perPage | 10
        });

        return data.map((m) => {
            return {
                id: m.id,
                title: m.title,
                description: m.description,
                releaseDate: m.releaseDate,
                genres: m.moviesToGenres?.map((g) => g.genre.name)
            };
        });
    }
    async insert(movie: CreateMovieDto, genres: Genre[]) {
        const genreIds = genres.map((g) => {
            return { genreId: g.id };
        });
        const { genres: listOfGenres, ...rest } = movie;
        const { id } = await this.prisma.movie.create({
            data: {
                ...rest,
                moviesToGenres: {
                    createMany: {
                        data: genreIds
                    }
                }
            }
        });

        return id;
    }

    async getByTitle(title: string) {
        const movie = await this.prisma.movie.findFirst({
            where: {
                title
            }
        });
        return movie;
    }

    async getById(id: number) {
        const movie = await this.prisma.movie.findFirst({
            where: {
                id
            }
        });
        return movie;
    }

    async updateById(id: number, movie: UpdateMovieDto) {
        const updated = await this.prisma.movie.update({
            where: {
                id
            },
            data: movie
        });
        return updated.id;
    }

    async deleteById(id: number) {
        const deleted = await this.prisma.movie.delete({
            where: {
                id
            }
        });

        return deleted.id;
    }

    async updateByIdWithGenres(id: number, movie: UpdateMovieDto, genres: Genre[]) {
        const genreIds = genres.map((g) => {
            return { genreId: g.id };
        });
        const updated = await this.prisma.movie.update({
            where: {
                id
            },
            data: {
                ...movie,
                moviesToGenres: {
                    deleteMany: {},
                    createMany: {
                        data: genreIds.map((i) => {
                            return { genreId: i.genreId };
                        })
                    }
                }
            }
        });

        return updated.id;
    }

    async searchMovies(searchParams: SearchMoviesDto) {
        let movieFilter = {};
        if (searchParams.title) {
            movieFilter = {
                startsWith: `%${searchParams.title}`,
                mode: "insensitive"
            };
        }
        const movies = await this.prisma.movie.findMany({
            where: {
                title: movieFilter,
                moviesToGenres: searchParams.genre
                    ? {
                          some: {
                              genre: {
                                  is: {
                                      name: searchParams.genre
                                  }
                              }
                          }
                      }
                    : {}
            },
            include: {
                moviesToGenres: {
                    include: {
                        genre: true
                    }
                }
            }
        });

        return movies.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                description: movie.description,
                releaseDate: movie.releaseDate,
                genres: movie.moviesToGenres?.map((item) => item.genre.name)
            };
        });
    }
}
