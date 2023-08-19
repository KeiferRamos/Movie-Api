import { PartialType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Match } from 'src/users/decorator/decorator';

export class BookmarkDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  genres: string;

  @IsString()
  movieId: string;
}

export class CreateBookMarkDto extends PickType(BookmarkDTO, ['movieId']) {}

export class CinephileDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  likes: string[];

  @Match('password')
  verify: string;

  @IsString()
  userImage: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookmarkDTO)
  bookmark: BookmarkDTO[];
}

export class PartialCinephileDto extends PartialType(CinephileDTO) {}
