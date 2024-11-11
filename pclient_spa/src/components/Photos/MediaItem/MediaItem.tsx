"use client";

import { useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import { IMedia } from "../../../types/media.types";
import { usePreviewStore } from "../../../stores/preivew.store";
import { mediaService } from "../../../services/media.service";

// eslint-disable-next-line react/display-name
export const MediaItem = memo(({ mediaFile }: { mediaFile: IMedia }) => {
  const { setPreviewFile, setOpen, setTitle } = usePreviewStore(
    (state) => state
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getMediaFileById", mediaFile.id],
    queryFn: () => mediaService.getMediaFileById({ id: mediaFile?.id }),
  });

  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    if (data?.data instanceof Blob) {
      const url = window.URL.createObjectURL(new Blob([data.data]));
      setMediaUrl(url);
    }
  }, [data]);

  const handlePreview = (url: string, type: string, mode?: string) => {
    setPreviewFile({ src: url, type, mode });
    setTitle(`Preview file ${mediaFile.path}`);
    setOpen(true);
  };

  return (
    <div className=" border-[1px] border-solid border-slate-400 rounded-xl flex justify-center items-center overflow-hidden object-cover  relative aspect-square">
      {mediaUrl && (
        <img
          onClick={() => handlePreview(mediaUrl, "image/jpeg")}
          className="w-full h-full object-cover hover:scale-110 scale-100 duration-300 transition-all cursor-pointer"
          src={mediaUrl}
          alt=""
        />
      )}

      {isLoading && (
        <div className="p-4 w-full h-full flex justify-center items-center">
          <span className="loaderCircle"></span>
        </div>
      )}
      {mediaFile?.dateCreate && (
        <div className="absolute bottom-2 left-2 text-sm bg-gray-700 p-1 rounded-lg opacity-65">
          {new Date(mediaFile.dateCreate).toLocaleString()}
        </div>
      )}
    </div>
  );
});
