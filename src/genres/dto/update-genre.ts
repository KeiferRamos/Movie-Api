import { PartialType } from '@nestjs/mapped-types';
import { GenreDto } from './genre';

export class UpdateGenreDto extends PartialType(GenreDto) {}
