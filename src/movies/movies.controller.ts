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
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateMovieDTO, ReviewDto } from './dto/create-movie.dto';
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
  addReview(@Param('id') id: string, @Body() body: ReviewDto, @Headers() item) {
    return this.movieService.addReview(id, body, item);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/reviews/delete/:id')
  deleteReview(@Param('id') id: string, @Body() body, @Headers() item) {
    return this.movieService.deleteReview(id, body.reviewid, item);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/reviews/edit/:id')
  editReview(
    @Param('id') id: string,
    @Body() body: ReviewDto,
    @Headers() item,
  ) {
    return this.movieService.editReview(id, body, item);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/likes/:id')
  LikeAndDislike(@Param('id') id: string, @Headers() item) {
    return this.movieService.like(id, item);
  }
}
