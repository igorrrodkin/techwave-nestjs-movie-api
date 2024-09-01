import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { GenresRepository } from "src/database/repositories/genres.service";

@Injectable()
export class GenresService {
    constructor(private genreRepository: GenresRepository) {}

    async create(genre: string) {
        const genreExists = await this.genreRepository.getByGenre(genre);
        if (genreExists) {
            throw new HttpException("Genre already exists", HttpStatus.CONFLICT);
        }
        const id = await this.genreRepository.insert(genre);

        return { id };
    }

    async getAll() {
        const genres = await this.genreRepository.getAll();
        return genres;
    }

    async deleteGenreById(id: number) {
        const genreExist = await this.genreRepository.getById(id);
        if (!genreExist) {
            throw new HttpException("Genre not found", HttpStatus.NOT_FOUND);
        }
        const genreId = await this.genreRepository.deleteById(id);
        return { id: genreId };
    }
}
