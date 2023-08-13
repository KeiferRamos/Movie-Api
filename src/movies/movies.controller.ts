import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './interface/movie.interface';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}
  @Post()
  getAllMovies(@Query() query, @Body() body): Promise<Movie[]> {
    return this.movieService.findAll(query, body);
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

  @Get('/similar/:id')
  getSimilar(@Param('id') id: string) {
    return this.movieService.findSimilar(id);
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

  @Put('/reviews/create/:id')
  addReview(@Param('id') id: string, @Body() body) {
    return this.movieService.addReview(id, body);
  }

  @Put('/reviews/delete/:id')
  deleteReview(@Param('id') id: string, @Body() body) {
    return this.movieService.deleteReview(id, body.reviewid);
  }

  @Put('/reviews/edit/:id')
  editReview(@Param('id') id: string, @Body() body) {
    return this.movieService.editReview(id, body);
  }

  @Put('/likes/:id')
  addLike(@Param('id') id, @Body() body) {
    return this.movieService.like(id, body.username);
  }

  @Put('/dislikes/:id')
  removeLike(@Param('id') id, @Body() body) {
    return this.movieService.dislike(id, body.username);
  }
}
