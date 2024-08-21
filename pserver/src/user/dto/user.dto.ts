import { $Enums } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @MinLength(6, { message: 'Min length password 6 characters' })
  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @IsOptional()
  roles?: $Enums.Roles;
}

export class GetUserListDto {
  @IsNumber()
  limit?: number;

  @IsNumber()
  offset?: number;
}

export class ActivateUserDto {
  @IsString()
  id: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @IsString()
  @IsOptional()
  roles?: $Enums.Roles;
}

export class DeleteUserDto {
  @IsString()
  id: string;
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  oldPassword: string;

  @IsString()
  @IsOptional()
  newPassword: string;
}
