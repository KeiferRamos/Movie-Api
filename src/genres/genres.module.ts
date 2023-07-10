import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre } from './schema/genre';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'genre', schema: Genre }])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
