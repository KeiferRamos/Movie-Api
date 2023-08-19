import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blogs } from './interface/blogs.interface';
import { MoviesService } from 'src/movies/movies.service';
import { UsersService } from 'src/users/users.service';
import { BlogsDto, UpdateBlogs } from './dto/blogs.dto';
import { getincludes } from 'src/helper';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel('blog') private readonly blogModel: Model<Blogs>,
    private readonly movieService: MoviesService,
    private readonly userService: UsersService,
  ) {}

  async create(item, body: BlogsDto) {
    const { id } = this.movieService.extractToken(item);

    const isValidUser = await this.userService.findById(id);
    if (!isValidUser) {
      throw new BadRequestException('who are you?');
    }

    return this.blogModel.create(body);
  }

  find(query) {
    const { includes, sort = 'title', ord = 'asc' } = query;
    const includedKeys = getincludes(includes);

    return this.blogModel.find({}, includedKeys).sort([[sort, ord]]);
  }

  findById(id: string, query) {
    const { includes } = query;
    const includedKeys = getincludes(includes);

    return this.blogModel.findById(id, includedKeys);
  }

  async delete(id: string, item) {
    const { id: userId } = this.movieService.extractToken(item);

    const isValidUser = await this.userService.findById(userId);
    if (!isValidUser) {
      throw new BadRequestException('who are you?');
    }
    return this.blogModel.findByIdAndDelete(id);
  }

  async update(body: UpdateBlogs, id, item) {
    const { id: userId } = this.movieService.extractToken(item);

    const isValidUser = await this.userService.findById(userId);
    if (!isValidUser) {
      throw new BadRequestException('who are you?');
    }

    return this.blogModel.findOneAndUpdate({ _id: id }, body, { new: true });
  }
}
