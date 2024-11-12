import { mediaService } from "../../../services/media.service";
import { PeopleItem } from "../PeopleItem/PeopleItem";
import { useQuery } from "@tanstack/react-query";

export const PeopleBar = () => {
  const { data: facesData } = useQuery({
    queryKey: ["queryGetFaces"],
    queryFn: () => mediaService.getPeoples(),
  });
  return (
    <div className=" bg-slate-700 px-4  h-[100px] w-full border-[1px] border-solid border-slate-600 p-2 rounded-t-xl absolute bottom-0 lef-0  ">
      <div className="flex overflow-x-auto overflow-y-hidden space-x-2">
        {facesData?.data.length &&
          facesData.data.map((item) => (
            <PeopleItem key={item.face} face={item} />
          ))}
      </div>
    </div>
  );
};
