import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './interface/genre';
import { GenreDto } from './dto/genre';
import { UsersService } from 'src/users/users.service';
import { getincludes } from 'src/helper';
import { UpdateGenreDto } from './dto/update-genre';

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

  async update(id: string, body: UpdateGenreDto, userAuth) {
    try {
      const { message, status } = await this.userService.validation(
        userAuth,
        'edit:genre',
      );

      if (!status) {
        throw new BadRequestException(message);
      }

      await this.userService.record(
        {
          id,
          summary: `update genre with id ${id}`,
          method: 'UPDATE',
          model: 'genre',
        },
        userAuth,
      );

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

      await this.userService.record(
        {
          id,
          summary: `delete genre with id ${id}`,
          method: 'DELETE',
          model: 'genre',
        },
        userAuth,
      );

      return this.genreModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async create(body: GenreDto, userAuth) {
    try {
      const { message, status } = await this.userService.validation(
        userAuth,
        'create:genre',
      );
      if (!status) {
        throw new BadRequestException(message);
      }

      await this.userService.record(
        {
          summary: `create genre`,
          method: 'CREATE',
          model: 'genre',
        },
        userAuth,
      );

      return this.genreModel.create(body);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }
}
