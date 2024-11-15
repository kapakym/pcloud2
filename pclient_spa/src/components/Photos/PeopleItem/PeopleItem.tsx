import { useQuery } from "@tanstack/react-query";
import cn from "clsx";
import { useEffect, useMemo, useState } from "react";
import { IPeopleResponse } from "../../../types/media.types";
import { useMediaStore } from "../../../stores/media.store";
import { mediaService } from "../../../services/media.service";
import { Image } from "lucide-react";

interface FaceItemProps {
  face: IPeopleResponse;
}

export const PeopleItem = ({ face }: FaceItemProps) => {
  const { peopleSelected, setPeoplesSelected } = useMediaStore(
    (state) => state
  );

  const { data, isLoading } = useQuery({
    queryKey: ["getFaceById", face.faceId],
    queryFn: () => mediaService.getFaceById({ id: face.faceId }),
  });

  const [mediaUrl, setMediaUrl] = useState("");

  useEffect(() => {
    if (data?.data instanceof Blob) {
      const url = window.URL.createObjectURL(new Blob([data.data]));
      setMediaUrl(url);
    }
  }, [data]);

  const isExistPeople = useMemo(
    () => peopleSelected.find((item) => item.key === face.key),
    [peopleSelected, face.face]
  );

  const handleClickPeople = () => {
    isExistPeople
      ? setPeoplesSelected(
          peopleSelected.filter((item) => item.key !== face.key)
        )
      : setPeoplesSelected([...peopleSelected, ...(face?.media || [])]);
  };

  return (
    <div
      className={cn(
        " rounded-xl relative overflow-hidden border-[2px] h-[80px] min-w-[80px] border-solid  aspect-square flex justify-center items-center",
        isExistPeople ? "border-green-600" : "border-white"
      )}
    >
      {isLoading && (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loaderCircle"></span>
        </div>
      )}
      {!isLoading &&
        (face.key === "-1" ? (
          <Image className="w-16 h-16" />
        ) : (
          <div className="relative">
            <img
              onClick={handleClickPeople}
              src={mediaUrl}
              alt=""
              className=" h-full w-full object-contain aspect-square"
            />
          </div>
        ))}
      <div className="absolute bottom-0 text-[10px] right-0  bg-gray-800 px-[6px] rounded-full">
        {face.media?.length}
      </div>
    </div>
  );
};
