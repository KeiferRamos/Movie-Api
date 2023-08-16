import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CastDto, CreateMovieDTO, ReviewDto } from './dto/create-movie.dto';
import { Movie } from './interface/movie.interface';
import getincludes from '../helper/getincludes';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('movie') private movieModel: Model<Movie>,
    private jwtService: JwtService,
  ) {}

  async create(body: CreateMovieDTO) {
    return this.movieModel.create({ ...body });
  }

  findAll(query) {
    const { limit, skip, includes, sort, ord = 'asc', ...rest } = query;

    const includedKeys = getincludes(includes);

    const response = this.movieModel
      .find({ ...rest }, includedKeys)
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    if (sort) {
      return response.sort([[sort, ord]]);
    }
    return response;
  }

  findSimilar(id: string) {
    return this.movieModel.find(
      { _id: { $ne: id } },
      { reviews: 0, similar: 0, plot: 0, trailer: 0, cast: 0 },
    );
  }

  findById(id: string, { includes }) {
    const includedKeys = getincludes(includes);
    return this.movieModel.findById(id, includedKeys);
  }

  update(_id: string, body: CreateMovieDTO) {
    return this.movieModel.findOneAndUpdate({ _id }, body, {
      new: true,
    });
  }

  add(id: string, body: CastDto) {
    return this.movieModel.updateOne(
      { _id: id },
      {
        $push: {
          cast: {
            ...body,
          },
        },
      },
    );
  }

  async addReview(id: string, { review }: ReviewDto, item) {
    const { _id: userId, userImage, username } = this.extractToken(item);
    const data = await this.movieModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          reviews: {
            review,
            userId,
            userImage,
            username,
          },
        },
      },
    );
    return { reviews: data.reviews };
  }

  deleteReview(id: string, reviewid: string, item) {
    return this.movieModel.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          reviews: {
            _id: reviewid,
            userId: this.extractToken(item)._id,
          },
        },
      },
    );
  }

  extractToken(item): any {
    const [type, token] = item.authorization?.split(' ') ?? [];
    return this.jwtService.decode(token);
  }

  editReview(id: string, { review }: ReviewDto, item) {
    return this.movieModel.updateOne(
      {
        'reviews._id': id,
        'reviews.userId': this.extractToken(item)._id,
      },
      {
        $set: {
          'reviews.$.review': review,
        },
      },
    );
  }

  async like(id: string, item) {
    const { _id: userId } = this.extractToken(item);
    const { likes } = await this.findById(id, { includes: { likes: 1 } });

    const { likes: response } = await this.movieModel.findOneAndUpdate(
      {
        _id: id,
      },
      likes.includes(userId)
        ? {
            $pull: { likes: { $eq: userId } },
          }
        : {
            $push: {
              likes: userId,
            },
          },
    );

    return { likes: response };
  }

  delete(id: string) {
    return this.movieModel.findByIdAndRemove(id);
  }
}
