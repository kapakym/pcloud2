import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { mediaService } from "../../../services/media.service";
import { IGetPeoplesReq, IPeopleResponse } from "../../../types/media.types";
import { PeopleItem } from "../PeopleItem/PeopleItem";

export const PeopleBar = () => {
  // @ts-expect-error
  const [limit, setLimit] = useState(6);
  const [offset, setOffset] = useState(0);
  const [peoples, setPeoples] = useState<IPeopleResponse[]>([]);
  const { ref, inView } = useInView({
    threshold: 0.5, // 50% видимости
  });

  useEffect(() => {
    setPeoples([]);
  }, []);

  useEffect(() => {
    if (inView) {
      setOffset((prev) => prev + limit);
      getFaces({ limit, offset: offset + limit });
    }
  }, [inView]);

  const { mutate: getFaces, isPending } = useMutation({
    mutationKey: ["mutationFaces"],
    mutationFn: (data: IGetPeoplesReq) => mediaService.getPeoples(data),
    onSuccess: (data) => {
      setPeoples([...peoples, ...data.data]);
    },
  });

  useEffect(() => {
    getFaces({ limit, offset });
  }, []);

  return (
    <div className=" bg-slate-700 px-4  h-[10px] hover:h-[100px] w-full border-[1px] border-solid border-slate-600 p-2 rounded-t-xl absolute bottom-0 lef-0 transition-all ease-in-out delay-150 opacity-35 hover:opacity-100">
      <div className="flex overflow-x-auto overflow-y-hidden space-x-2">
        {!!peoples.length &&
          peoples.map((item) => <PeopleItem key={item.face} face={item} />)}
        {isPending && <span className="loaderCircle absolute left-1/2"></span>}
        {peoples.length > limit - 1 && (
          <div className="w-[40px] h-[100px]" ref={ref}></div>
        )}
      </div>
    </div>
  );
};
