import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CinephileService } from './cinephile.service';
import {
  BookmarkDTO,
  CinephileDTO,
  CreateBookMarkDto,
  PartialCinephileDto,
} from './dto/cinephile.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('cinephile')
export class CinephileController {
  constructor(private readonly cinephileService: CinephileService) {}

  @Post('sign-up')
  signUp(@Body() body: CinephileDTO) {
    return this.cinephileService.create(body);
  }

  @Post('sign-in')
  signIn(@Body() body: PartialCinephileDto) {
    return this.cinephileService.signin(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Body() body: PartialCinephileDto, @Param('id') id: string) {
    return this.cinephileService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('bookmark/:id')
  bookMarkItem(@Headers() item, @Param('id') id) {
    return this.cinephileService.addBookmark(item, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unbookmark/:id')
  unbookMarkItem(@Headers() item, @Param('id') id) {
    return this.cinephileService.removeBookmark(item, id);
  }

  @Get()
  getAll(@Query() query) {
    return this.cinephileService.findAll(query);
  }

  @Get(':id')
  getById(@Param('id') id, @Query() query) {
    return this.cinephileService.findById(id, query);
  }
}
