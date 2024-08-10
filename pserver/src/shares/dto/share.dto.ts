import { TypeShare } from '@prisma/client';
import { IsDate, IsString } from 'class-validator';

export class CreateShareDto {
  @IsString()
  path: string;

  @IsString()
  type: TypeShare;

  @IsString()
  password?: string;

  @IsString()
  filename: string;

  @IsDate()
  timeLive: Date;
}

export class DeleteShareDto {
  @IsString()
  id: string;
}

export class UpdateShareDto {
  @IsString()
  id: string;

  @IsString()
  password?: string;

  @IsDate()
  timeLive: Date;
}
