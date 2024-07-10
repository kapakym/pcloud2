import { IsArray, IsString } from 'class-validator';
import { IFile } from '../types/files.types';

export class CreateFileDto {}

export class ActionFilesDto {
  @IsString()
  sourcePath: string;

  @IsString()
  destPath: string;

  @IsArray()
  files: IFile[];
}

export class DeleteFilesDto {
  @IsString()
  path: string;

  @IsArray()
  files: IFile[];
}

export class UploadFileDto {
  @IsString()
  filename: string;

  @IsString()
  uuid: string;

  @IsString()
  path: string;
}
