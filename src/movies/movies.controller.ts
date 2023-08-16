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
import {
  CreateMovieDTO,
  EditReviewDto,
  ReviewDto,
} from './dto/create-movie.dto';
import { Movie } from './interface/movie.interface';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}
  @Get()
  getAllMovies(@Query() query): Promise<Movie[]> {
    return this.movieService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createMovie(@Body() body: CreateMovieDTO): Promise<Movie> {
    return this.movieService.create(body);
  }

  @Get(':id')
  getMovieById(@Param('id') id: string, @Query() query): Promise<Movie> {
    return this.movieService.findById(id, query);
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

  @UseGuards(JwtAuthGuard)
  @Put('/reviews/create/:id')
  addReview(@Param('id') id: string, @Body() body: ReviewDto) {
    return this.movieService.addReview(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/reviews/delete/:id')
  deleteReview(@Param('id') id: string, @Body() body) {
    return this.movieService.deleteReview(id, body.reviewid);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/reviews/edit/:id')
  editReview(@Param('id') id: string, @Body() body: EditReviewDto) {
    return this.movieService.editReview(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/likes/:id')
  Like(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.movieService.like(id, body.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/dislikes/:id')
  Dislike(@Param('id') id: string, @Body() body: { userId: string }) {
    return this.movieService.dislike(id, body.userId);
  }
}
