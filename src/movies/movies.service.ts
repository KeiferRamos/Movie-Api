import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CastDto,
  CreateMovieDTO,
  ReviewDto,
  UpdateMovie,
} from './dto/create-movie.dto';
import { Movie } from './interface/movie.interface';
import { getincludes } from '../helper';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel('movie') private movieModel: Model<Movie>,
    private readonly userService: UsersService,
  ) {}

  async create(body: CreateMovieDTO, item) {
    try {
      const { message, status } = await this.userService.validation(
        item,
        'create:movie',
      );
      if (!status) {
        throw new BadRequestException(message);
      }

      await this.userService.record(
        {
          summary: `create movie`,
          method: 'CREATE',
          model: 'movie',
        },
        item,
      );

      return this.movieModel.create({ ...body });
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  findAll(query) {
    const {
      limit,
      skip,
      rank = 0,
      includes,
      sort,
      ord = 'asc',
      ...rest
    } = query;

    const includedKeys = getincludes(includes);

    const response = this.movieModel
      .find({ ...rest, rank: { $gte: rank } }, includedKeys)
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
      { reviews: 0, similar: 0, plot: 0, trailer: 0, cast: 0, rank: 0 },
    );
  }

  findById(id: string, { includes }) {
    const includedKeys = getincludes(includes);
    return this.movieModel.findById(id, includedKeys);
  }

  async update(_id: string, body: UpdateMovie, item) {
    try {
      const { message, status } = await this.userService.validation(
        item,
        'edit:movie',
      );

      if (!status) {
        throw new BadRequestException(message);
      }

      await this.userService.record(
        {
          id: _id,
          summary: `update movie with id ${_id}`,
          method: 'UPDATE',
          model: 'movie',
        },
        item,
      );

      return this.movieModel.findOneAndUpdate({ _id }, body, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.response);
    }
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
    try {
      const {
        _id: userId,
        userImage,
        username,
      } = this.userService.extractToken(item);

      const { reviews } = await this.movieModel.findOneAndUpdate(
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
        { new: true },
      );
      return { reviews };
    } catch {
      throw new BadRequestException('what are you doing boy?');
    }
  }

  async deleteReview(id: string, item) {
    try {
      const { reviews } = await this.movieModel.findOneAndUpdate(
        {
          'reviews._id': id,
        },
        {
          $pull: {
            reviews: {
              _id: id,
              userId: this.userService.extractToken(item)._id,
            },
          },
        },
        { new: true },
      );
      return { reviews };
    } catch {
      throw new BadRequestException('what are you doing boy?');
    }
  }

  async editReview(id: string, { review }: ReviewDto, item) {
    try {
      const { reviews } = await this.movieModel.findOneAndUpdate(
        {
          'reviews._id': id,
          'reviews.userId': this.userService.extractToken(item)._id,
        },
        {
          $set: {
            'reviews.$.review': review,
          },
        },
        { new: true },
      );
      return { reviews };
    } catch {
      throw new BadRequestException('what are you doing boy?');
    }
  }

  async like(id: string, item) {
    try {
      const { _id: userId } = this.userService.extractToken(item);
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
    } catch {
      throw new BadRequestException('what are you doing boy?');
    }
  }

  async delete(id: string, item) {
    try {
      const { message, status } = await this.userService.validation(
        item,
        'delete:movie',
      );

      if (!status) {
        throw new BadRequestException(message);
      }

      await this.userService.record(
        {
          id,
          summary: `deleted movie with id ${id}`,
          method: 'DELETE',
          model: 'movie',
        },
        item,
      );

      return this.movieModel.findByIdAndRemove(id);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }
}
