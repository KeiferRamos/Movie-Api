import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './interface/genre';
import { GenreDto } from './dto/genre';

@Injectable()
export class GenresService {
  constructor(@InjectModel('genre') private genreModel: Model<Genre>) {}

  findAll() {
    return this.genreModel.find();
  }

  findById(name: string) {
    return this.genreModel.findOne({ name });
  }

  update(id: string, body: GenreDto) {
    return this.genreModel.findByIdAndUpdate(id, body, { new: true });
  }

  delete(id: string) {
    return this.genreModel.findByIdAndDelete(id);
  }

  create(body: GenreDto) {
    return this.genreModel.create(body);
  }
}
