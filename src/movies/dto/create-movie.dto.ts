import { PartialType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

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

class RankDto {
  @IsBoolean()
  isRanked: boolean;

  rankNumber: number;
}

export class CreateMovieDTO {
  @IsString()
  title: string;

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

  @IsArray()
  @Type(() => ReviewDto)
  reviews: ReviewDto[];

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
