import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsDate, IsArray, ArrayMinSize, IsOptional } from "class-validator";

// the best way to create UpdateMovieDto class is shown on the line below however it is not visible by swagger documentation
// export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

export class UpdateMovieDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title?: string;

    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    @Transform(({ value }) => {
        return new Date(value);
    })
    releaseDate?: Date;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    genres?: string[];
}
