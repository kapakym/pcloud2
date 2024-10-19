import { IsNumber, IsString } from 'class-validator';

export class ScanMediaDto {
  @IsString()
  path: string;

  @IsString()
  uuidTask: string;
}

export class GetMediaListDto {
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

export class GetMediaByIdtDto {
  @IsString()
  id: string;
}

export class TaskIdDto {
  @IsString()
  uuidTask: string;
}
