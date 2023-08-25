import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenreDto } from './dto/genre';
import { UpdateGenreDto } from './dto/update-genre';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('genres')
export class GenresController {
  constructor(private readonly genreService: GenresService) {}

  @Get()
  getAllGenre(@Query() query) {
    return this.genreService.findAll(query);
  }

  @Get(':id')
  getGenreById(@Param('id') id: string) {
    return this.genreService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createGenre(@Body() body: GenreDto, @Headers() userAuth) {
    return this.genreService.create(body, userAuth);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateGenre(@Param('id') id: string, @Body() body: UpdateGenreDto, userAuth) {
    return this.genreService.update(id, body, userAuth);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteGenre(@Param('id') id: string, @Headers() userAuth) {
    return this.genreService.delete(id, userAuth);
  }
}
