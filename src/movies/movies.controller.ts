import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/createMovie.dto';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { SearchMoviesDto } from './dto/searchMovies.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  getAll(
    @Query('perPage', ParseIntPipe) perPage: number = 10,
    @Query('page', ParseIntPipe) page: number = 1
  ) {
    return this.moviesService.getAllMovies(page, perPage);
  }

  @Post('new')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  createMovie(@Body() movie: CreateMovieDto) {
    return this.moviesService.addMovie(movie);
  }

  @Patch(':id')
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )
  updateMovie(
    @Body() movie: UpdateMovieDto,
    @Param('id', ParseIntPipe) id: number
  ) {
    return this.moviesService.updateMovieById(id, movie);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  deleteMovie(@Param('id', ParseIntPipe) id: number) {
    return this.moviesService.deleteMoviebyId(id);
  }

  @Get('search')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  searchMovies(@Query() query: SearchMoviesDto) {
    return this.moviesService.searchMovies(query);
  }
}
