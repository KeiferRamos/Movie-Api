import { IsString } from 'class-validator';

export class GenreDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  mobileImage: string;

  @IsString()
  description: string;
}
