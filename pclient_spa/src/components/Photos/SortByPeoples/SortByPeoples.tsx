import cn from "clsx";
import { useMediaStore } from "../../../stores/media.store";
import { MediaItem } from "../MediaItem/MediaItem";

export const SortByPeoples = () => {
  const { peopleSelected } = useMediaStore((state) => state);

  console.info(peopleSelected.flat());
  return (
    <>
      <div className={cn(`w-full l grid grid-cols-3 gap-4 p-2`)}>
        {peopleSelected?.length &&
          peopleSelected.map((item) => (
            <div key={`${item.id}${item.path}`}>
              <MediaItem mediaFile={item}></MediaItem>
            </div>
          ))}
      </div>
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
