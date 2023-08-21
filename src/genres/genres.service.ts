import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Genre } from './interface/genre';
import { GenreDto } from './dto/genre';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel('genre') private genreModel: Model<Genre>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  extractToken(item): any {
    const [type, token] = item.authorization?.split(' ') ?? [];
    return this.jwtService.decode(token);
  }

  findAll() {
    return this.genreModel.find();
  }

  findById(id: string) {
    return this.genreModel.findById(id);
  }

  async update(id: string, body: GenreDto, userAuth) {
    const { id: userId } = this.extractToken(userAuth);

    const isValidUser = await this.userService.findById(userId);

    if (!isValidUser) {
      throw new BadRequestException('who are you?');
    }

    return this.genreModel.findByIdAndUpdate(id, body, { new: true });
  }

  async delete(id: string, userAuth) {
    const { id: userId } = this.extractToken(userAuth);

    const isValidUser = await this.userService.findById(userId);

    if (!isValidUser) {
      throw new BadRequestException('who are you?');
    }

    return this.genreModel.findByIdAndDelete(id);
  }

  async create(body: GenreDto, userAuth) {
    const { id: userId } = this.extractToken(userAuth);

    const isValidUser = await this.userService.findById(userId);

    if (!isValidUser) {
      throw new BadRequestException('who are you?');
    }

    return this.genreModel.create(body);
  }
}
