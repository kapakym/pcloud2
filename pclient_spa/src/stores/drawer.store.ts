import { ReactNode } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IDrawerStore {
  open: boolean;
  childrenDrawer: ReactNode | null;
  title: string;
  setOpen: (payload: boolean) => void;
  onClose: () => void;
  setChildrenDrawer: (payload: ReactNode | null) => void;
  setTitle: (payload: string) => void;
}

export const useDrawerStore = create<IDrawerStore>()(
  immer((set) => ({
    open: false,
    childrenDrawer: null,
    title: "",
    onClose: () =>
      set(() => ({
        open: false,
        childrenDrawer: null,
      })),
    setOpen: (payload) =>
      set(() => ({
        open: payload,
      })),
    setChildrenDrawer: (payload) =>
      set(() => ({
        childrenDrawer: payload,
      })),
    setTitle: (payload) =>
      set(() => ({
        title: payload,
      })),
  }))
);
