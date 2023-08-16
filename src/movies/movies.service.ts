import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CastDto,
  CreateMovieDTO,
  EditReviewDto,
  ReviewDto,
} from './dto/create-movie.dto';
import { Movie } from './interface/movie.interface';
import getincludes from '../helper/getincludes';

@Injectable()
export class MoviesService {
  constructor(@InjectModel('movie') private movieModel: Model<Movie>) {}

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

  addReview(id: string, body: ReviewDto) {
    return this.movieModel.updateOne(
      { _id: id },
      {
        $push: {
          reviews: {
            ...body,
          },
        },
      },
    );
  }

  deleteReview(id: string, reviewid: string) {
    return this.movieModel.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          reviews: {
            _id: reviewid,
          },
        },
      },
    );
  }

  editReview(id: string, { review }: EditReviewDto) {
    return this.movieModel.updateOne(
      {
        'reviews._id': id,
      },
      {
        $set: {
          'reviews.$.review': review,
        },
      },
    );
  }

  async dislike(id: string, userId: string) {
    return this.movieModel.updateOne(
      {
        _id: id,
      },
      {
        $pull: { likes: { $eq: userId } },
      },
    );
  }

  async like(id: string, userId: string) {
    return this.movieModel.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          likes: userId,
        },
      },
    );
  }

  delete(id: string) {
    return this.movieModel.findByIdAndRemove(id);
  }
}
