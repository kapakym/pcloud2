export type TypeFile = 'folder' | 'file';

export interface IFile {
  name: string;
  type: TypeFile;
}

export type TypeStatusFileOperation = 'success' | 'error';

export interface IResponseFileActions {
  filename: string;
  status: TypeStatusFileOperation;
  description?: string;
}
