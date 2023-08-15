import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cinephile } from './interface/cinephile.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  BookmarkDTO,
  CinephileDTO,
  PartialCinephileDto,
} from './dto/cinephile.dto';
import getincludes from 'src/helper/getincludes';

@Injectable()
export class CinephileService {
  constructor(
    @InjectModel('cinephile') private readonly CinephileModel: Model<Cinephile>,
    private readonly jwtservice: JwtService,
  ) {}

  async create({ email, password, ...rest }: CinephileDTO) {
    const isValidEmail = await this.CinephileModel.findOne({ email });

    if (isValidEmail) {
      return new BadRequestException('email already exist.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return this.CinephileModel.create({
      email,
      password: hashedPassword,
      ...rest,
    });
  }

  async signin({ password, email }) {
    const isValidEmail = await this.CinephileModel.findOne({ email });

    if (!isValidEmail) {
      return new BadRequestException('incorrect email or password');
    }

    const passwordVerify = await bcrypt.compare(
      password,
      isValidEmail.password,
    );
    if (!passwordVerify) {
      throw new BadRequestException('incorrect email or password');
    }

    return {
      access_token: this.jwtservice.sign(
        {
          id: isValidEmail._id,
        },
        { expiresIn: '24h' },
      ),
    };
  }

  findAll({ includes }) {
    const includedKeys = getincludes(includes);
    return this.CinephileModel.find({}, includedKeys);
  }

  addBookmark(id: string, body: BookmarkDTO) {
    return this.CinephileModel.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          bookmark: body,
        },
      },
      { new: true },
    );
  }

  removeBookmark(id: string) {
    return this.CinephileModel.findOneAndUpdate(
      {},
      {
        $pull: {
          bookmark: { _id: id },
        },
      },
      { new: true },
    );
  }

  update(id: string, body: PartialCinephileDto) {
    return this.CinephileModel.findByIdAndUpdate(id, body, { new: true });
  }
}
