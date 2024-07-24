import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interface/user';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { RecordDto, UserDto } from './dto/user.dto';
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

  async findAll(auth) {
    try {
      const { message, status } = await this.validation(auth, 'view:users');
      if (!status) {
        throw new BadRequestException(message);
      }
      return this.userModel.find();
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async findById(id, auth) {
    try {
      const { message, status } = await this.validation(auth, 'view:users');
      if (!status) {
        throw new BadRequestException(message);
      }

      return this.userModel.findById(id);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async validation(item, permission: string) {
    const { id } = this.extractToken(item);

    const user = await this.userModel.findById(id);

    if (user && user.permissions && user.permissions.includes(permission)) {
      return { message: 'success', status: true };
    }

    return { message: 'Unauthorized', status: false };
  }

  async update(id, body: UpdateUserDto, auth) {
    try {
      const { message, status } = await this.validation(auth, 'edit:user');

      if (status) {
        return this.userModel.findOneAndUpdate({ _id: id }, body, {
          new: true,
        });
      }

      throw new BadRequestException(message);
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async delete(id: string, auth) {
    try {
      const { id: userId, permissions } = this.extractToken(auth);
      if (
        (userId !== id && permissions && permissions.includes('delete:user')) ||
        userId === id
      ) {
        await this.userModel.findByIdAndDelete(id);
        return { message: 'account successfully deleted' };
      }
      throw new BadRequestException('Unauthorized');
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  record(body: RecordDto, auth) {
    try {
      const { id } = this.extractToken(auth);
      return this.userModel.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            activities: body,
          },
        },
      );
    } catch (error) {
      throw new BadRequestException(error.response);
    }
  }

  async register(body: UserDto) {
    let permissions: string[];
    const invalidEmail = await this.userModel.findOne({ email: body.email });
    if (invalidEmail) {
      throw new BadRequestException('email already in used');
    }
    if (body.role === 'admin') {
      permissions = adminPermission;
    } else if (body.role === 'dev') {
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
      access_token: this.jwtService.sign(
        {
          id: validEmail._id,
          role: validEmail.role,
        },
        { expiresIn: '8h' },
      ),
    };
  }
}
