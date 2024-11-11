"use client";

import MediaActionFacesBar from "../../components/Photos/MediaActionBar/MediaActionFacesBar";
import { PeopleBar } from "../../components/Photos/PeopleBar/PeopleBar";
import { SortByPeoples } from "../../components/Photos/SortByPeoples/SortByPeoples";
import { ModalPreview } from "../../components/ui/ModalPreview/ModalPreview";
import { ModalPreviewVideo } from "../../components/ui/ModalPreviewVideo/ModalPreviewVideo";
import { useMediaActions } from "../../hooks/use-media-actions.hook";
import { useMediaStore } from "../../stores/media.store";

export function MediaList() {
  const { openPeoplesBar } = useMediaStore((state) => state);

  useMediaActions();

  return (
    <div className="w-full h-full flex flex-col">
      <MediaActionFacesBar />
      <div className="h-full w-full overflow-y-auto flex-1">
        <div className="w-full min-h-full grid gap-4 p-2">
          <SortByPeoples />
        </div>
        <div className="h-[10px]"></div>
      </div>
      {openPeoplesBar && <PeopleBar />}
      <ModalPreview />
      <ModalPreviewVideo />
    </div>
  );
}
