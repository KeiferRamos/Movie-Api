import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Match, RegistrationId, ValidateRole } from '../decorator/decorator';

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

  @IsEmail()
  email: string;

  @ValidateRole(process.env.ADMIN_PASS)
  admin: string;

  @IsString()
  role: string;
}

export class RecordDto {
  @IsString()
  method: string;

  @IsString()
  model: string;

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  summary: string;
}
