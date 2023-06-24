import { IsString } from 'class-validator';

export class ActivityDto {
  @IsString()
  type: string;

  @IsString()
  id: string;

  @IsString()
  summary: string;

  @IsString()
  user: string;

  @IsString()
  action: string;
}
