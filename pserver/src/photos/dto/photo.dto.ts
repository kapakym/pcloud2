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

  @IsString()
  sortBy?: string;

  @IsString()
  sortWay?: string;
}

export class GetPeoplesListDto {
  // @IsNumber()
  // limit: number;

  // @IsNumber()
  // offset: number;

  @IsString()
  sortBy?: string;

  @IsString()
  sortWay?: string;
}

export class GetPhotoByIdtDto {
  @IsString()
  id: string;
}

export class TaskIdDto {
  @IsString()
  uuidTask: string;
}
