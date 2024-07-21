import { IsNumber, IsString } from 'class-validator';

export class ScanPhotoDto {
  @IsString()
  path: string;

  @IsString()
  uuidTask: string;
}

export class GetPhotoListDto {
  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;
}
