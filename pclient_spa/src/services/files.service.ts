import { requestBuilder } from "../api/requestBuilder";
import {
  IActionFilesReq,
  IDeleteFilesReq,
  IDownloadFilesReq,
  IFolder,
  IRenameFilesReq,
  TypeActionFilesRes,
} from "../types/files.types";

class FilesService {
  async getFiles(data: { path: string }) {
    const response = await requestBuilder<{ path: string }, IFolder>({
      url: "files",
      method: "post",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }

  async copyFiles(data: IActionFilesReq) {
    const response = await requestBuilder<IActionFilesReq, TypeActionFilesRes>({
      url: "files/copy",
      method: "post",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }

  async moveFiles(data: IActionFilesReq) {
    const response = await requestBuilder<IActionFilesReq, TypeActionFilesRes>({
      url: "files/move",
      method: "post",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }

  async renameFile(data: IRenameFilesReq) {
    const response = await requestBuilder<IRenameFilesReq, TypeActionFilesRes>({
      url: "files/rename",
      method: "post",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }

  async deleteFiles(data: IDeleteFilesReq) {
    const response = await requestBuilder<IDeleteFilesReq, TypeActionFilesRes>({
      url: "files/delete",
      method: "post",
      options: {
        isAuth: true,
        data,
      },
    });
    return response;
  }

  async downloadFile(
    data: IDownloadFilesReq,
    progressFnDw: (progress: number) => void
  ) {
    const response = await requestBuilder<IDownloadFilesReq, Blob>({
      url: "files/download",
      method: "post",
      progressFnDw,
      options: {
        isAuth: true,
        data,
        responseType: "blob",
      },
    });
    return response;
  }

  async uploadFile(data: FormData, progressFnUp: (progress: number) => void) {
    const response = await requestBuilder<
      FormData,
      { uuid: string; status: string; description?: string }
    >({
      url: "files/upload",
      method: "post",
      progressFnUp,

      options: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        isAuth: true,
        data,
      },
    });
    return response;
  }
}

export const filesService = new FilesService();
