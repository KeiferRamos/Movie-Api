import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activity } from './interface/activity';
import { ActivityDto } from './dto/activity.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectModel('activity') private activityModel: Model<Activity>,
  ) {}

  create(body: ActivityDto) {
    return this.activityModel.create(body);
  }

  findAllByUser(id: string) {
    return this.activityModel.find({ user: { $eq: id } });
  }
}
