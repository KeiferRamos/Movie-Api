import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { GenresModule } from './genres/genres.module';
import { CinephileModule } from './cinephile/cinephile.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    GenresModule,
    AuthModule,
    MoviesModule,
    UsersModule,
    CinephileModule,
    BlogsModule,
  ],
})
export class AppModule {}
