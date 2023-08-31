import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blogs } from './interface/blogs.interface';
import { UsersService } from 'src/users/users.service';
import { BlogsDto, UpdateBlogs } from './dto/blogs.dto';
import { getincludes } from 'src/helper';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel('blog') private readonly blogModel: Model<Blogs>,
    private readonly userService: UsersService,
  ) {}

  async create(item, body: BlogsDto) {
    try {
      const { message, status } = await this.userService.validation(
        item,
        'create:blog',
      );
      if (!status) {
        throw new BadRequestException(message);
      }

      await this.userService.record(
        {
          summary: `create blog`,
          method: 'CREATE',
          model: 'blog',
        },
        item,
      );

      return this.blogModel.create(body);
    } catch {
      throw new BadRequestException('Internal Server Error');
    }
  }

  find(query) {
    const { includes, sort = 'title', ord = 'asc', ...rest } = query;
    const includedKeys = getincludes(includes);

    return this.blogModel.find({ ...rest }, includedKeys).sort([[sort, ord]]);
  }

  findById(id: string, query) {
    const { includes } = query;
    const includedKeys = getincludes(includes);

    return this.blogModel.findById(id, includedKeys);
  }

  async delete(id: string, item) {
    try {
      const { message, status } = await this.userService.validation(
        item,
        'delete:blog',
      );
      if (!status) {
        throw new BadRequestException(message);
      }

      await this.userService.record(
        {
          summary: `delete blog with id ${id}`,
          method: 'DELETE',
          model: 'blog',
        },
        item,
      );

      return this.blogModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async update(body: UpdateBlogs, id, item) {
    try {
      const { message, status } = await this.userService.validation(
        item,
        'edit:blog',
      );
      if (!status) {
        throw new BadRequestException(message);
      }

      await this.userService.record(
        {
          summary: `update blog with id ${id}`,
          method: 'UPDATE',
          model: 'blog',
        },
        item,
      );

      return this.blogModel.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }
}
