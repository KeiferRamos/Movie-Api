import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './interface/genre';
import { GenreDto } from './dto/genre';
import { UsersService } from 'src/users/users.service';
import { getincludes } from 'src/helper';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel('genre') private genreModel: Model<Genre>,
    private readonly userService: UsersService,
  ) {}

  findAll({ includes }) {
    const includedKeys = getincludes(includes);
    return this.genreModel.find({}, includedKeys);
  }

  findById(id: string) {
    return this.genreModel.findById(id);
  }

  async update(id: string, body: GenreDto, userAuth) {
    try {
      const { message, status } = await this.userService.validation(
        userAuth,
        'update:genre',
      );
      if (!status) {
        throw new BadRequestException(message);
      }

      return this.genreModel.findByIdAndUpdate(id, body, { new: true });
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async delete(id: string, userAuth) {
    try {
      const { message, status } = await this.userService.validation(
        userAuth,
        'delete:genre',
      );
      if (!status) {
        throw new BadRequestException(message);
      }

      return this.genreModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async create(body: GenreDto, userAuth) {
    try {
      const { message, status } = await this.userService.validation(
        userAuth,
        'delete:genre',
      );
      if (!status) {
        throw new BadRequestException(message);
      }

      return this.genreModel.create(body);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }
}
