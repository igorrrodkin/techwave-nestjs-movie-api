import { Module } from '@nestjs/common';
import { MoviesRepository } from 'src/database/repositories/movies.service';
import { PrismaService } from 'src/database/prisma.service';
import { GenresRepository } from './repositories/genres.service';

@Module({
  providers: [PrismaService, MoviesRepository, GenresRepository],
  exports: [MoviesRepository, GenresRepository]
})
export class PrismaModule {}
