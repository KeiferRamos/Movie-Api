import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class CastDto {
  @IsString()
  name: string;

  @IsString()
  asCharacter: string;

  @IsString()
  image: string;
}

class RankDto {
  @IsBoolean()
  isRanked: boolean;

  @IsNumberString()
  rankNumber: number;
}

export class CreateMovieDTO {
  @IsString()
  title: string;

  @IsNumberString()
  @IsNumber()
  year: number;

  @IsString()
  plot: string;

  @IsString()
  trailer: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsString()
  @IsOptional()
  mobileImage: string;

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
  similar: [];
}
