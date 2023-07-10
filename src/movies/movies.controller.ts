import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './interface/movie.interface';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}
  @Get()
  getAllMovies(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createMovie(@Body() body: CreateMovieDTO): Promise<Movie> {
    return this.movieService.create(body);
  }

  @Get(':id')
  getMovieById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateMovie(
    @Param('id') id: string,
    @Body() body: CreateMovieDTO,
  ): Promise<Movie> {
    return this.movieService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteMovieById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/cast/:id')
  addCast(@Param('id') id: string, @Body() body) {
    return this.movieService.add(id, body);
  }
}
