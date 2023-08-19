import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogsDto, UpdateBlogs } from './dto/blogs.dto';
import { BlogsService } from './blogs.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createBlog(@Headers() item, @Body() body: BlogsDto) {
    return this.blogsService.create(item, body);
  }

  @Get()
  getAllBlogs(@Query() query) {
    return this.blogsService.find(query);
  }

  @Get(':id')
  getBlogById(@Param('id') id: string, @Query() query, @Headers() item) {
    return this.blogsService.findById(id, query), item;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteBlogById(@Param('id') id: string, @Headers() item) {
    return this.blogsService.delete(id, item);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateBlog(@Body() body: UpdateBlogs, @Param('id') id, @Headers() item) {
    return this.blogsService.update(body, id, item);
  }
}
