import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Match } from 'src/users/decorator/decorator';

export class BookmarkDTO {
  @IsString()
  title: string;

  @IsNumber()
  year: number;

  @IsString()
  image: string;

  @IsArray()
  @IsString({ each: true })
  genres: string;

  @IsString()
  movieId: string;
}

export class CinephileDTO {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  likes: string[];

  @Match('password')
  verify: string;

  @IsString()
  userImage: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BookmarkDTO)
  bookmark: BookmarkDTO[];
}

export class PartialCinephileDto extends PartialType(CinephileDTO) {}
