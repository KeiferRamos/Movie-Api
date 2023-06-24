import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie } from './schema/movie';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'movie', schema: Movie }])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
