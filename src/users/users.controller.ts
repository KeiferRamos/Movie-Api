import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseGuards,
  Delete,
  Get,
  Headers,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { loginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  registerUser(@Body() body: UserDto) {
    return this.userService.register(body);
  }

  @Post('login')
  loginUser(@Body() body: loginDto) {
    return this.userService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Headers() auth,
  ) {
    return this.userService.update(id, body, auth);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string, @Headers() auth) {
    return this.userService.delete(id, auth);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUser(@Headers() auth) {
    return this.userService.findAll(auth);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getUser(@Param('id') id, @Headers() auth) {
    return this.userService.findById(id, auth);
  }
}
