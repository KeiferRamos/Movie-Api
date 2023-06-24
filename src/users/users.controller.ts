import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Delete,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { loginDto } from './dto/login.dto';
import { userDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  registerUser(@Body() body: userDto) {
    return this.userService.register(body);
  }

  @Post('login')
  loginUser(@Body() body: loginDto) {
    return this.userService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
