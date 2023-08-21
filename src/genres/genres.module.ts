import { Module } from '@nestjs/common';
import { GenresController } from './genres.controller';
import { GenresService } from './genres.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Genre } from './schema/genre';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'genre', schema: Genre }]),
    UsersModule,
    JwtModule.register({
      secret: process.env.SECRET,
    }),
  ],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
