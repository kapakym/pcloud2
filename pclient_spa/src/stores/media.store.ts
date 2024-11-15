import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  IMedia,
  TypeMediaActions,
  TypeSortMedia,
  TypeSortWay,
} from "../types/media.types";

interface IMediaActionsStore {
  action: TypeMediaActions;
  limit: number;
  offset: number;
  total: number;
  mediaFileList: IMedia[];
  selectMode: boolean;
  previewPhoto: string | null;
  sortBy: TypeSortMedia;
  sortWay: TypeSortWay;
  openPeoplesBar: boolean;
  peopleSelected: IMedia[] | [];
  showPeople: boolean;
  search: string;

  setLimit: (payload: number) => void;
  setOffset: (payload: number) => void;
  setTotal: (payload: number) => void;
  setMediaFileList: (payload: IMedia[]) => void;
  setAction: (payload: TypeMediaActions) => void;
  setSelectMode: (payload: boolean) => void;
  setPreviewPhoto: (payload: string) => void;
  setSortBy: (payload: TypeSortMedia) => void;
  setSortWay: (payload: TypeSortWay) => void;
  setOpenPeoplesBar: (payload: boolean) => void;
  setPeoplesSelected: (payload: IMedia[]) => void;
  setShowPeople: (payload: boolean) => void;
  setSearch: (payload: string) => void;
}

export const useMediaStore = create<IMediaActionsStore>()(
  immer((set) => ({
    action: null,
    limit: 6,
    offset: 0,
    total: 0,
    mediaFileList: [],
    selectMode: false,
    previewPhoto: null,
    sortBy: undefined,
    sortWay: "asc",
    peopleSelected: [],
    openPeoplesBar: true,
    showPeople: false,
    search: "",

    setLimit: (payload) => set(() => ({ limit: payload })),
    setTotal: (payload) => set(() => ({ total: payload })),
    setOffset: (payload) => set(() => ({ offset: payload })),
    setMediaFileList: (payload) => set(() => ({ mediaFileList: payload })),
    setAction: (payload) => set(() => ({ action: payload })),
    setSelectMode: (payload) => set(() => ({ selectMode: payload })),
    setPreviewPhoto: (payload) => set(() => ({ previewPhoto: payload })),
    setSortBy: (payload) => set(() => ({ sortBy: payload })),
    setSortWay: (payload) => set(() => ({ sortWay: payload })),
    setOpenPeoplesBar: (payload) => set(() => ({ openPeoplesBar: payload })),
    setPeoplesSelected: (payload) => set(() => ({ peopleSelected: payload })),
    setShowPeople: (payload) => set(() => ({ showPeople: payload })),
    setSearch: (payload) => set(() => ({ search: payload })),
  }))
);
