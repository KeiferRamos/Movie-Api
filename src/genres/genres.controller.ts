import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre';
import { UpdateGenreDto } from './dto/update-genre';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Get()
  getAllGenre() {
    return this.genreService.findAll();
  }

  @Get(':name')
  getGenreById(@Param('name') name: string) {
    return this.genreService.findById(name);
  }

  @Post()
  createGenre(@Body() body: GenreDto) {
    return this.genreService.create(body);
  }

  @Put(':id')
  updateGenre(@Param('id') id: string, @Body() body: UpdateGenreDto) {
    return this.genreService.update(id, body);
  }

  @Delete(':id')
  deleteGenre(@Param('id') id: string) {
    return this.genreService.delete(id);
  }
}
