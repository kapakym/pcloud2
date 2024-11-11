import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { TypeStatusLogs } from "../types/logs.types";

export interface ITaskStore {
  title: string;
  typeProgress?: "percent" | "infinity";
  createTime?: Date;
  completedTime?: Date;
  description?: string;
  completed: boolean;
  percent?: number;
  id?: string;
  status?: TypeStatusLogs;
}
interface ILogsStore {
  tasks: ITaskStore[];
  completedTask: ITaskStore[];
  addTask: (payload: ITaskStore) => string;
  setCompletedTask: (payload: { uuid: string; description?: string }) => void;
  setPercent: (payload: { percent: number; uuid: string }) => void;
}

export const useLogsStore = create<ILogsStore>()(
  immer((set) => ({
    tasks: [],
    completedTask: [],
    addTask: (payload: ITaskStore) => {
      if (!payload?.id) payload.id = uuidv4();
      payload.status = "in progress";
      //   payload?.typeProgress ? payload?.typeProgress : "percent";
      payload.createTime = new Date();
      set((state) => {
        state.tasks.push(payload);
      });
      return payload.id;
    },
    setCompletedTask: async (payload: {
      uuid: string;
      description?: string;
    }) => {
      set((state) => {
        const task = state.tasks.find((item) => item.id === payload.uuid);

        if (task) {
          task.percent = 100;
          task.completedTime = new Date();
          task.status = "completed";
          task.description = payload.description;
          state.completedTask.push(task);
          state.tasks = state.tasks.filter((item) => item.id !== payload.uuid);
        }
      });
    },
    setPercent: async (payload) => {
      set((state) => {
        state.tasks = state.tasks.map((item) => {
          if (item.id === payload.uuid) item.percent = payload.percent;
          return item;
        });
      });
    },
  }))
);
