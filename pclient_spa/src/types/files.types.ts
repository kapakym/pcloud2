import { IFilesStore } from "../stores/file-actions.store";

export interface IFolder {
  files: IFile[];
  folders: IFile[];
}

export interface IFile {
  name: string;
  type: string;
  size?: number;
}

export interface IDeleteFilesReq {
  path: string;
  files: IFile[];
}

export interface IDownloadFilesReq {
  path: string;
  filename: string;
}

export interface IActionFilesReq {
  sourcePath: string;
  destPath: string;
  files: IFilesStore[];
}

export interface IRenameFilesReq {
  sourcePath: string;
  newName: string;
  file: IFilesStore;
}

export interface IActionFiles {
  filename: string;
  status: string;
  description?: string;
}

export interface ICreateShareLinkReq {
  password?: string;
  timeLive?: string;
  path: string;
  filename: string;
  type: string;
}

export interface IUpdateShareLinkReq {
  id: string;
  password?: string;
  timeLive?: string;
}

export type TypeActionFilesRes = IActionFiles[];

export type TypeFiles =
  | "file"
  | "folder"
  | "upFolder"
  | "image"
  | "movie"
  | "pdf";

export type TypeFilesActions =
  | "paste"
  | "copy"
  | "download"
  | "upload"
  | "edit"
  | "delete"
  | "view"
  | "move"
  | "selectAll"
  | null;
