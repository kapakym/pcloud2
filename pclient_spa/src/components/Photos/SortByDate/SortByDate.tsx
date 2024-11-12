import cn from "clsx";
import dayjs from "dayjs";
import { MediaItem } from "../MediaItem/MediaItem";
import { IGetMediaRes, IMedia } from "../../../types/media.types";

export const SortByDate = ({ data }: { data: IGetMediaRes | undefined }) => {
  const groupedItems = data?.files?.reduce((acc, item) => {
    const date = dayjs(item.dateCreate).format("DD-MM-YYYY");

    if (!acc[date]) {
      acc[date] = [];
    }
    if (!acc[date].find((el) => el.id === item.id)) {
      acc[date].push(item);
    }
    return acc;
  }, {} as Record<string, IMedia[]>);
  return (
    <>
      {groupedItems &&
        Object.entries(groupedItems).map(([date, items]) => (
          <div key={date}>
            <div className="">
              <h2 className="px-4 pt-4">{date}</h2>
            </div>

            <div
              className={cn(
                `w-full  grid grid-cols-2 md:grid-cols-3 gap-4 p-2`
              )}
            >
              {items.map((item) => (
                <div key={`${item.id}${item.path}`}>
                  <MediaItem mediaFile={item}></MediaItem>
                </div>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};
