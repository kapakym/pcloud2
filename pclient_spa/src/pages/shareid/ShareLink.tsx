"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useShareStore } from "../../stores/share.store";
import { useMutation } from "@tanstack/react-query";
import { shareService } from "../../services/share.service";
import { useShareLinkActions } from "../../hooks/use-share-link-actions.hook";
import { useDoubleTouchHook } from "../../hooks/use-double-touch.hook";
import { TypeFiles } from "../../types/files.types";
import { ShareLinkBar } from "../../components/ShareLinkBar/ShareLinkBar";
import { FileItemRow } from "../../components/ui/FileItems/FileItemRow";

export const ShareLink = () => {
  const { id } = useParams<{ id: string }>();
  const { path, setPath, setSelectedShareLink, selectedShareLink, selectMode } =
    useShareStore((state) => state);
  const { data, mutate: mutateGetShareFiles } = useMutation({
    mutationKey: ["getShareFiles", path, id],
    mutationFn: (data: { path: string; id: string; password?: string }) =>
      shareService.getFiles(data),
  });
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState<string | undefined>();

  useEffect(() => {
    if (id) {
      mutateGetShareFiles({ id, path });
    }
  }, [id, path, mutateGetShareFiles]);

  useShareLinkActions(id);

  useEffect(() => {
    if (data?.data.status) {
      switch (data?.data?.status) {
        case "access_denied":
          setOpen(true);
          break;
        case "token":
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "shareToken",
              data?.data?.token ? data?.data?.token : ""
            );
          }
          mutateGetShareFiles({ id, path });
          setOpen(false);
          break;
      }
    }
  }, [data, id, mutateGetShareFiles, path]);

  useEffect(() => {
    if (password) {
      mutateGetShareFiles({
        password,
        id,
        path,
      });
    }
  }, [password, id, path, mutateGetShareFiles]);

  const handleEnterFolder = (folderName: string) => {
    setPath(path + "/" + folderName);
    setSelectedShareLink([]);
  };

  const handleExitFolder = () => {
    const pathSplit = path.split("/");
    pathSplit.pop();
    setPath(pathSplit.join("/"));
  };

  const doubleTouchHook = useDoubleTouchHook();

  const handleTouch = (
    event: React.TouchEvent<HTMLDivElement>,
    folderName: string
  ) => {
    if (doubleTouchHook()) {
      handleEnterFolder(folderName);
    }
  };

  const handleSelected = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    name: string,
    type: TypeFiles
  ) => {
    if (event.shiftKey || selectMode) {
      selectedShareLink.find((item) => item.name === name)
        ? setSelectedShareLink(
            selectedShareLink.filter((item) => item.name !== name)
          )
        : setSelectedShareLink([...selectedShareLink, { name, type }]);
    } else {
      selectedShareLink.find((item) => item.name === name)
        ? setSelectedShareLink([])
        : setSelectedShareLink([{ name, type }]);
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <ShareLinkBar />
      <div className="overflow-y-auto h-full">
        {path && (
          <FileItemRow
            file={{ name: ".." }}
            key={".."}
            typeFile={"upFolder"}
            onDoubleClick={() => handleExitFolder()}
            handleTouch={() => handleExitFolder()}
          />
        )}

        {data?.data?.folders?.map((item) => (
          <FileItemRow
            file={item}
            key={item.name}
            typeFile={"folder"}
            handleTouch={(event) => handleTouch(event, item.name)}
            onDoubleClick={() => handleEnterFolder(item.name)}
          />
        ))}
        {data?.data?.files?.map((item) => (
          <FileItemRow
            file={item}
            key={item.name}
            typeFile={"file"}
            selected={
              !!selectedShareLink.find(
                (itemFind) => itemFind.name === item.name
              )
            }
            onClick={(event) => handleSelected(event, item.name, "file")}
          />
        ))}
        <ModalEnterPasswordShare
          open={open}
          setOpen={setOpen}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};
