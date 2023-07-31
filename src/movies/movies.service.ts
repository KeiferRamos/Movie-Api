import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CastDto, CreateMovieDTO } from './dto/create-movie.dto';
import { Movie } from './interface/movie.interface';

@Injectable()
export class MoviesService {
  constructor(@InjectModel('movie') private movieModel: Model<Movie>) {}

  async create(body: CreateMovieDTO) {
    return this.movieModel.create({ ...body });
  }

  findAll() {
    return this.movieModel.find();
  }

  findById(id: string) {
    return this.movieModel.findById(id);
  }

  update(_id: string, body: CreateMovieDTO) {
    return this.movieModel.findOneAndUpdate({ _id }, body, {
      new: true,
    });
  }

  add(id: string, body) {
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

  addReview(id: string, body) {
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

  editReview(id: string, { title, review, username, userImage }) {
    return this.movieModel.updateOne(
      {
        'reviews._id': id,
      },
      {
        $set: {
          'reviews.$.title': title,
          'reviews.$.review': review,
          'reviews.$.username': username,
          'reviews.$.userImage': userImage,
        },
      },
    );
  }

  like(id, username) {
    return this.movieModel.updateOne(
      {
        _id: id,
      },
      {
        $push: {
          likes: username,
        },
      },
    );
  }

  dislike(id, username) {
    return this.movieModel.updateOne(
      {
        _id: id,
      },
      {
        $pull: { likes: { $eq: username } },
      },
    );
  }

  delete(id: string) {
    return this.movieModel.findByIdAndRemove(id);
  }
}
