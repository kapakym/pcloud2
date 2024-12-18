"use client";

import { useQuery } from "@tanstack/react-query";
import { filesService } from "../../services/files.service";
import { useFileActionsStore } from "../../stores/file-actions.store";
import { useFilesActions } from "../../hooks/use-files-actions.hook";
import { TypeFiles } from "../../types/files.types";
import { useDoubleTouchHook } from "../../hooks/use-double-touch.hook";
import FileActionBar from "../../components/FileActionBar/FileActionBar";
import { FileItemRow } from "../../components/ui/FileItems/FileItemRow";
import { ModalPreview } from "../../components/ui/ModalPreview/ModalPreview";

function FilesList() {
  const { selected, setSelected, path, setPath, selectMode } =
    useFileActionsStore((state) => state);

  const { data } = useQuery({
    queryKey: ["getFiles", path],
    queryFn: () => filesService.getFiles({ path }),
  });

  useFilesActions(data);

  const handleEnterFolder = (folderName: string) => {
    setPath(path + "/" + folderName);
    setSelected([]);
  };

  const handleExitFolder = () => {
    const pathSplit = path.split("/");
    pathSplit.pop();
    setPath(pathSplit.join("/"));
  };

  const handleSelected = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    name: string,
    type: TypeFiles
  ) => {
    if (event.shiftKey || selectMode) {
      selected.find((item) => item.name === name)
        ? setSelected(selected.filter((item) => item.name !== name))
        : setSelected([...selected, { name, type }]);
    } else {
      selected.find((item) => item.name === name)
        ? setSelected([])
        : setSelected([{ name, type }]);
    }
  };

  const doubleTouchHook = useDoubleTouchHook();

  const handleTouch = (folderName: string) => {
    if (doubleTouchHook()) {
      handleEnterFolder(folderName);
    }
  };

  return (
    <div className="w-full h-full flex flex-col select-none">
      <FileActionBar />
      <div className="w-full  overflow-y-auto h-full ">
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
            handleTouch={() => handleTouch(item.name)}
            onDoubleClick={() => handleEnterFolder(item.name)}
            onClick={(event) => handleSelected(event, item.name, "folder")}
            selected={
              !!selected.find((itemFind) => itemFind.name === item.name)
            }
          />
        ))}
        {data?.data?.files?.map((item) => (
          <FileItemRow
            file={item}
            key={item.name}
            typeFile={"file"}
            onClick={(event) => handleSelected(event, item.name, "file")}
            selected={
              !!selected.find((itemFind) => itemFind.name === item.name)
            }
          />
        ))}
      </div>
      <ModalPreview />
    </div>
  );
}

export { FilesList };
