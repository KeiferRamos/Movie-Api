import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { imageValue } from 'src/users/constant';
import { ValidateObject } from 'src/users/decorator/decorator';

export class CastDto {
  @IsString()
  name: string;

  @IsString()
  asCharacter: string;

  @ValidateObject(imageValue)
  image: Object;
}

class RankDto {
  @IsBoolean()
  isRanked: boolean;

  @IsNumber()
  rankNumber: number;
}

export class CreateMovieDTO {
  @IsString()
  title: string;

  @IsNumberString()
  year: string;

  @IsString()
  plot: string;

  @ValidateObject(imageValue)
  image: Object;

  @IsBoolean()
  @IsOptional()
  featured: boolean;

  @IsArray()
  @IsOptional()
  @Type(() => CastDto)
  cast: CastDto[];

  @IsOptional()
  rank: RankDto;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  genres: string[];

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  similar: string[];
}
