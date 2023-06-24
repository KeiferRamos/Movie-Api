import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './interface/movie.interface';
import { MoviesService } from './movies.service';

@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}
  @Get()
  getAllMovies(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Post('create')
  createMovie(@Body() body: CreateMovieDTO): Promise<Movie> {
    return this.movieService.create(body);
  }

  @Get(':id')
  getMovieById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findById(id);
  }

  @Put(':id')
  updateMovie(
    @Param('id') id: string,
    @Body() body: CreateMovieDTO,
  ): Promise<Movie> {
    return this.movieService.update(id, body);
  }

  @Delete(':id')
  deleteMovieById(@Param('id') id: string): Promise<Movie> {
    return this.movieService.delete(id);
  }

  @Put('/cast/:id')
  addCast(@Param('id') id: string, @Body() body) {
    return this.movieService.add(id, body);
  }
}
