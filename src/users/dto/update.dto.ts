import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(UserDto) {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  permissions: [];
}
