import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { mediaService } from "../services/media.service";
import { useLogsStore } from "../stores/logs.store";
import { useMediaStore } from "../stores/media.store";
import { IScanMediaReq } from "../types/media.types";

export const useMediaActions = () => {
  const { action, setAction } = useMediaStore((state) => state);

  const { addTask } = useLogsStore((state) => state);

  const actionsFunctions: Record<string, (uuid: string) => void> = {
    scanAll: (uuid) => {
      addTask({
        completed: false,
        title: "scan media",
        id: uuid,
        typeProgress: "infinity",
      });
      mutateScanMedia({ uuidTask: uuid });
    },

    scanFaces: (uuid) => {
      addTask({
        completed: false,
        title: "scan faces",
        id: uuid,
        typeProgress: "infinity",
      });
      mutateScanFace({ uuidTask: uuid });
    },
    updateClusters: (uuid) => {
      addTask({
        completed: false,
        title: "update clusters",
        id: uuid,
        typeProgress: "infinity",
      });
      mutateUpdateClusters({ uuidTask: uuid });
    },

    clearCluster: (uuid) => {
      addTask({
        completed: false,
        title: "clear clusters",
        id: uuid,
        typeProgress: "infinity",
      });
      mutateClearCluster();
    },

    clearMedia: (uuid) => {
      addTask({
        completed: false,
        title: "clear clusters",
        id: uuid,
        typeProgress: "infinity",
      });
      mutateClearMedia();
    },

    clearFaces: (uuid) => {
      addTask({
        completed: false,
        title: "clear clusters",
        id: uuid,
        typeProgress: "infinity",
      });
      mutateClearFaces();
    },

    scanText: (uuid) => {
      addTask({
        completed: false,
        title: "scan text",
        id: uuid,
        typeProgress: "infinity",
      });
      mutateScanText({ uuidTask: uuid });
    },
  };

  const { mutate: mutateScanMedia } = useMutation({
    mutationKey: ["scanFiles"],
    mutationFn: (data: IScanMediaReq = { uuidTask: "" }) =>
      mediaService.scanFiles(data),
  });

  const { mutate: mutateScanText } = useMutation({
    mutationKey: ["scanText"],
    mutationFn: (data: { uuidTask: string } = { uuidTask: "" }) =>
      mediaService.scanText(data),
  });

  const { mutate: mutateScanFace } = useMutation({
    mutationKey: ["mutateScanFace"],
    mutationFn: (data: { uuidTask: string }) => mediaService.scanFaces(data),
  });

  const { mutate: mutateUpdateClusters } = useMutation({
    mutationKey: ["mutateUpdateClusters"],
    mutationFn: (data: { uuidTask: string }) =>
      mediaService.updateClusters(data),
  });

  const { mutate: mutateClearCluster } = useMutation({
    mutationKey: ["mutateClearClusters"],
    mutationFn: () => mediaService.clearCluster(),
  });

  const { mutate: mutateClearMedia } = useMutation({
    mutationKey: ["mutateClearMedia"],
    mutationFn: () => mediaService.clearMedia(),
  });

  const { mutate: mutateClearFaces } = useMutation({
    mutationKey: ["mutateClearFaces"],
    mutationFn: () => mediaService.clearFaces(),
  });

  useEffect(() => {
    setAction(null);
    if (action) {
      const uuid = uuidv4();
      actionsFunctions[action](uuid);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action]);
};
