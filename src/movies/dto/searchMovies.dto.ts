import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class SearchMoviesDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    genre: string;
}
