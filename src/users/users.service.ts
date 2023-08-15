import { Injectable, BadRequestException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { userDto } from './dto/user.dto';
import { loginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  update(_id: string, body: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({ _id }, body, {
      new: true,
    });
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async register(body: userDto) {
    const invalidEmail = await this.userModel.findOne({ email: body.email });
    if (invalidEmail) {
      throw new BadRequestException('email already in used');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
    });

    return { message: 'registered successfully', success: true, id: user._id };
  }

  async login({ password, email }: loginDto) {
    const validEmail = await this.userModel.findOne({ email });
    if (!validEmail) {
      throw new BadRequestException('incorrect email or password');
    }

    const passwordVerify = await bcrypt.compare(password, validEmail.password);
    if (!passwordVerify) {
      throw new BadRequestException('incorrect email or password');
    }

    return {
      user: {
        image: validEmail.image,
      },
      access_token: this.jwtService.sign(
        {
          id: validEmail._id,
          role: validEmail.role,
          username: validEmail.username,
        },
        { expiresIn: '24h' },
      ),
    };
  }
}
