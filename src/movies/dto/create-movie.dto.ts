import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ReviewDto {
  @IsString()
  review: string;
}

export class CastDto {
  @IsString()
  name: string;

  @IsString()
  asCharacter: string;

  @IsString()
  image: string;
}

class SimilarDto {
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  mobileImage: string;

  @IsNumber()
  year: number;

  @IsBoolean()
  featured: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  likes: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsString()
  movieId: string;
}

export class CreateMovieDTO {
  @IsString()
  title: string;

  @IsNumber()
  year: number;

  @IsString()
  plot: string;

  @IsString()
  trailer: string;

  @IsString()
  image: string;

  @IsString()
  mobileImage: string;

  @IsBoolean()
  featured: boolean;

  @IsArray()
  @Type(() => CastDto)
  @ValidateNested({ each: true })
  cast: CastDto[];

  @IsArray()
  @IsOptional()
  @Type(() => ReviewDto)
  @ValidateNested({ each: true })
  reviews: ReviewDto[];

  @IsNumber()
  rank: number;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsArray()
  @Type(() => SimilarDto)
  @ValidateNested({ each: true })
  similar: SimilarDto[];
}

export class UpdateMovie extends PartialType(CreateMovieDTO) {}
