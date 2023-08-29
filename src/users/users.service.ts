import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { loginDto } from './dto/login.dto';
import { adminPermission, developerPermission } from './constant';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('user') private readonly userModel: Model<User>,
  ) {}

  extractToken(item): any {
    const [type, token] = item.authorization?.split(' ') ?? [];
    return this.jwtService.decode(token);
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  async update(body: UpdateUserDto, auth) {
    try {
      const { id } = this.extractToken(auth);

      const user = await this.userModel.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      if (user) {
        return { message: 'updated successfully', status: true };
      }
      return { message: 'unauthorized', status: false };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: string, auth) {
    try {
      const { id: userId } = this.extractToken(auth);

      if (userId !== id) {
        const isValidUser = await this.findById(userId);

        if (!isValidUser || !isValidUser.permissions.includes('delete:user')) {
          throw new BadRequestException('unauthorized');
        }
      }
      return this.userModel.findByIdAndDelete(id);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async validation(item, permission: string) {
    const { id: userId } = this.extractToken(item);

    const isValidUser = await this.findById(userId);

    if (!isValidUser || !isValidUser.permissions.includes(permission)) {
      return { message: 'unauthorized', status: false };
    }

    return { message: 'success', status: true };
  }

  async register(body: UserDto) {
    let permissions: string[];
    const invalidEmail = await this.userModel.findOne({ email: body.email });
    if (invalidEmail) {
      throw new BadRequestException('email already in used');
    }
    if (body.role === 'administrator') {
      permissions = adminPermission;
    } else if (body.role === 'developer') {
      permissions = developerPermission;
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const user = await this.userModel.create({
      ...body,
      password: hashedPassword,
      permissions,
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
        { expiresIn: '8h' },
      ),
    };
  }
}
