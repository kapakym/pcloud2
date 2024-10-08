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

export class GetFilesShareLinkDto {
  @IsString()
  id: string;

  @IsString()
  password?: string;

  @IsString()
  path?: string;
}

export type TypesStatusShareLink =
  | 'invalid_password'
  | 'not_found'
  | 'access_denied'
  | 'ok'
  | 'time_leave';

export class DownloadShareFilesDto {
  @IsString()
  path: string;

  @IsString()
  filename: string;

  @IsString()
  id: string;
}
