import cn from "clsx";
import { useMediaStore } from "../../../stores/media.store";
import { MediaItem } from "../MediaItem/MediaItem";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { IMedia } from "../../../types/media.types";

export const SortByPeoples = () => {
  const { peopleSelected } = useMediaStore((state) => state);
  //   @ts-expect-error
  const [limit, setLimit] = useState(12);
  const [offset, setOffset] = useState(0);
  const [showPeoples, setShowPepople] = useState<IMedia[] | []>([]);

  const { ref, inView } = useInView({
    threshold: 0.5, // 50% видимости
  });

  useEffect(() => {
    if (inView) {
      if (offset < peopleSelected.length) setOffset(offset + limit);
    }
  }, [inView]);

  useEffect(() => {
    if (peopleSelected.length > 0) {
      setOffset(0);
      setShowPepople([...peopleSelected.slice(offset, limit)]);
    } else {
      setShowPepople([]);
    }
  }, [peopleSelected]);

  useEffect(() => {
    console.info(offset);
    setShowPepople([
      ...showPeoples,
      ...peopleSelected.slice(offset, offset + limit),
    ]);
  }, [offset]);

  return (
    <>
      <div className={cn(`w-full l grid grid-cols-3 gap-4 p-2`)}>
        {!!showPeoples?.length &&
          showPeoples.map((item) => (
            <div key={`${item.id}${item.path}`}>
              <MediaItem mediaFile={item}></MediaItem>
            </div>
          ))}
      </div>
      <div ref={ref} className="w-full h-[100px]"></div>
    </>
  );
};

// return (
//   <>
//     {!!peopleSelected.length &&
//       peopleSelected.map((face) => (
//         <div key={face.faceId}>
//           <FaceIcon face={face} />
//           <div className={cn(`w-full l grid grid-cols-3 gap-4 p-2`)}>
//             {face?.media?.length &&
//               face.media.map((item) => (
//                 <div key={`${item.id}${item.path}`}>
//                   <MediaItem mediaFile={item}></MediaItem>
//                 </div>
//               ))}
//           </div>
//         </div>
//       ))}
//   </>
// );
