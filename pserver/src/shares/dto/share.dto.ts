import { TypeShare } from '@prisma/client';
import { IsDate, IsString } from 'class-validator';

export class CreateShareDto {
  @IsString()
  path: string;

  @IsString()
  type: TypeShare;

  @IsString()
  password?: string;

  @IsDate()
  timeLive: Date;
}
