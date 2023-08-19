import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cinephile } from './interface/cinephile.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CinephileDTO, PartialCinephileDto } from './dto/cinephile.dto';
import { getincludes } from 'src/helper';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class CinephileService {
  constructor(
    @InjectModel('cinephile') private readonly CinephileModel: Model<Cinephile>,
    private readonly movieService: MoviesService,
    private readonly jwtservice: JwtService,
  ) {}

  async create({ email, password, ...rest }: CinephileDTO) {
    const isValidEmail = await this.CinephileModel.findOne({ email });

    if (isValidEmail) {
      throw new BadRequestException('email already exist.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.CinephileModel.create({
      email,
      password: hashedPassword,
      ...rest,
    });
  }

  async signin({ password, email }) {
    const isValidEmail = await this.CinephileModel.findOne({ email });

    if (!isValidEmail) {
      throw new BadRequestException('incorrect email or password');
    }

    const passwordVerify = await bcrypt.compare(
      password,
      isValidEmail.password,
    );
    if (!passwordVerify) {
      throw new BadRequestException('incorrect email or password');
    }
    const { username, userImage, _id } = isValidEmail;
    return {
      access_token: this.jwtservice.sign(
        { username, userImage, _id },
        { expiresIn: '24h' },
      ),
      user: { username, userImage, _id },
    };
  }

  findAll({ includes }) {
    const includedKeys = getincludes(includes);
    return this.CinephileModel.find({}, includedKeys);
  }

  findById(id: string, query) {
    const includes = getincludes(query.includes);
    return this.CinephileModel.findById(id, includes);
  }

  async addBookmark(item, movieId) {
    const { _id } = this.movieService.extractToken(item);

    try {
      const movie = await this.movieService.findById(movieId, {
        includes: { title: 1, genres: 1, image: 1, year: 1 },
      });

      const data = await this.CinephileModel.findOneAndUpdate(
        { _id },
        {
          $push: {
            bookmark: {
              movieId,
              title: movie.title,
              year: movie.year,
              genres: movie.genres,
              image: movie.image,
            },
          },
        },
        { new: true },
      );
      return { bookmark: data.bookmark };
    } catch {
      throw new BadRequestException(`no movie with id ${movieId}`);
    }
  }

  async removeBookmark(item, movieId) {
    const { _id } = this.movieService.extractToken(item);

    try {
      const { bookmark } = await this.CinephileModel.findOneAndUpdate(
        { _id },
        {
          $pull: {
            bookmark: { movieId },
          },
        },
        { new: true },
      );
      return { bookmark };
    } catch {
      return { message: "no idea what you're doing" };
    }
  }

  update(id: string, body: PartialCinephileDto) {
    return this.CinephileModel.findByIdAndUpdate(id, body, { new: true });
  }
}
