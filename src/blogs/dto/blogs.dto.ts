import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';

class ContentDto {
  @IsString()
  htmlElement: string;

  @IsString()
  value: string;
}

export class BlogsDto {
  @IsString()
  title: string;

  @IsString()
  bannerImage: string;

  @IsString()
  author: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ContentDto)
  @ValidateNested({ each: true })
  contents: ContentDto[];
}

export class UpdateBlogs extends PartialType(BlogsDto) {}
