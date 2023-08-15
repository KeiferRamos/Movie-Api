import {
  Body,
  Controller,
  Get,
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
  bookMarkItem(@Param('id') id: string, @Body() body: BookmarkDTO) {
    return this.cinephileService.addBookmark(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('bookmark/:id')
  removeMarkItem(@Param('id') id: string) {
    return this.cinephileService.removeBookmark(id);
  }

  @Get()
  getAll(@Query() query) {
    return this.cinephileService.findAll(query);
  }
}
