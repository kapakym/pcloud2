export interface IScanMediaReq {
  path?: string;
  uuidTask: string;
}

export interface IMedia {
  id: string;
  path: string;
  lat?: string;
  lon?: string;
  dateCreate?: string;
  userId: string;
  type: string;
  key: string;
}

export interface IGetMediaReq {
  limit: number;
  offset: number;
  sortBy?: TypeSortMedia;
  sortWay?: TypeSortWay;
  search?: string;
}

export interface IGetPeoplesReq {
  limit?: number;
  offset?: number;
  sortBy?: TypeSortMedia;
  sortWay?: TypeSortWay;
}

export interface IGetMediaRes extends IGetMediaReq {
  files: IMedia[];
  total: number;
}

export type TypeMediaActions =
  | "scanAll"
  | "scanFaces"
  | "updateClusters"
  | "preview"
  | "show_faces"
  | "clearCluster"
  | "clearFaces"
  | "clearMedia"
  | "scanText"
  | null;

export type TypeSortMedia = "dateCreate" | "peoples" | undefined;
export type TypeSortWay = "asc" | "desc";

export interface IPeopleResponse {
  id: string;
  name: string;
  face: string;
  faceId: string;
  media?: IMedia[];
  key: string;
}
