import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivityDto } from './dto/activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activityService: ActivitiesService) {}

  @Get(':id')
  getActivity(@Param('id') id: string) {
    return this.activityService.findAllByUser(id);
  }

  @Post()
  createActivity(@Body() body: ActivityDto) {
    return this.activityService.create(body);
  }
}
