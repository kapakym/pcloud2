"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useMediaStore } from "../../stores/media.store";
import { mediaService } from "../../services/media.service";
import { useMediaActions } from "../../hooks/use-media-actions.hook";
import { SortByDate } from "../../components/Photos/SortByDate/SortByDate";
import { SortNotFilter } from "../../components/Photos/SortNotFilter.tsx/SortNotFilter";
import Pagination from "../../components/Pagination/Pagination";
import { ModalPreview } from "../../components/ui/ModalPreview/ModalPreview";
import { ModalPreviewVideo } from "../../components/ui/ModalPreviewVideo/ModalPreviewVideo";
import MediaActionBar from "../../components/Photos/MediaActionBar/MediaActionBar";

export function MediaList() {
  const { limit, offset, setOffset, sortBy, sortWay, search } = useMediaStore(
    (state) => state
  );

  const { data } = useQuery({
    queryKey: ["getMediaFiles", offset, sortBy, sortWay, limit, search],
    queryFn: () =>
      mediaService.getMediaFiles({ offset, sortBy, sortWay, limit, search }),
  });

  const [page, setPage] = useState(1);

  useMediaActions();

  const getContent = () => {
    switch (sortBy) {
      case "dateCreate":
        return <SortByDate data={data?.data} />;

      default:
        return <SortNotFilter data={data?.data} />;
    }
  };

  const totalPages = useMemo(
    () => Math.floor(data?.data?.total ? data?.data?.total / limit : 0),
    [data?.data?.total, limit]
  );

  const handleChangePage = (page: number) => {
    setOffset(limit * (page - 1));
    setPage(page);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <MediaActionBar />
      <div className="h-full w-full overflow-y-auto flex-1">
        <div className="w-full min-h-full grid gap-4 p-2">{getContent()}</div>
        <div className="h-[10px]"></div>
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handleChangePage}
      />
      <ModalPreview />
      <ModalPreviewVideo />
    </div>
  );
}
