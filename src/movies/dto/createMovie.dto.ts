import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsString,
  ArrayMinSize,
  IsDateString,
  IsDate
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => {
    return new Date(value);
  })
  releaseDate: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  genres: string[];
}
