import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { GenresService } from "./genres.service";
import { CreateGenreDto } from "./dto/createGenre.dto";

@Controller("genres")
export class GenresController {
    constructor(private readonly genresService: GenresService) {}

    @Get()
    getGenres() {
        return this.genresService.getAll();
    }

    @Post("new")
    @UsePipes(ValidationPipe)
    createGenre(@Body() genre: CreateGenreDto) {
        return this.genresService.create(genre.name);
    }

    @Delete(":id")
    @UsePipes(new ValidationPipe())
    deleteMovie(@Param("id", ParseIntPipe) id: number) {
        return this.genresService.deleteGenreById(id);
    }
}
