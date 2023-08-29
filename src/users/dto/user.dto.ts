import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import {
  Match,
  RegistrationId,
  ValidateObject,
  ValidateRole,
} from '../decorator/decorator';
import { addressValue, nameValue } from '../constant';

export class UserDto {
  @IsString()
  username: string;

  @RegistrationId(process.env.REGISTRATION_ID)
  registrationId: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  @Match('password')
  verify: string;

  @IsString()
  @IsOptional()
  contactNumber: string;

  @IsString()
  @IsOptional()
  image: string;

  @IsEmail()
  email: string;

  @ValidateRole(process.env.ADMIN_PASS)
  admin: string;

  @IsString()
  @IsOptional()
  bio: string;

  @IsString()
  role: string;

  @ValidateObject(nameValue)
  @IsOptional()
  fullName: Object;

  @ValidateObject(addressValue)
  @IsOptional()
  address: Object;
}
