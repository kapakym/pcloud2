import { IsArray, IsObject, IsString } from 'class-validator';
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

export class RenameFileDto {
  @IsString()
  sourcePath: string;

  @IsString()
  newName: string;

  @IsObject()
  file: IFile;
}

export class DeleteFilesDto {
  @IsString()
  path: string;

  @IsArray()
  files: IFile[];
}

export class DownloadFilesDto {
  @IsString()
  path: string;

  @IsString()
  filename: string;
}

export class UploadFileDto {
  @IsString()
  filename: string;

  @IsString()
  uuid: string;

  @IsString()
  path: string;
}
