import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Movie } from './schema/movie';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'movie', schema: Movie }]),
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
