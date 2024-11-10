import cn from "clsx";
import { Check, CheckCheck, DownloadCloud, Eye } from "lucide-react";
import { useShareStore } from "../../stores/share.store";
import { TypeShareActions } from "../../types/share.types";
import { VSeparator } from "../ui/VSeparator/VSeparator";

function ShareLinkBar() {
  const { setSelectMode, selectMode, selectedShareLink, setAction } =
    useShareStore((state) => state);

  const handleSetAction = (action: TypeShareActions) => {
    setAction(action);
  };

  return (
    <div className="bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl">
      <div className="flex items-center space-x-1">
        <Check
          size={28}
          className={cn(
            "  cursor-pointer ",
            selectMode
              ? "text-green-500"
              : "text-slate-400 hover:text-slate-200"
          )}
          onClick={() => setSelectMode(!selectMode)}
        />

        <CheckCheck
          size={28}
          className="text-slate-400 hover:text-slate-200 cursor-pointer"
          // onClick={() => handleSetAction('selectAll')}
        />
        <VSeparator />
      </div>

      <div className="flex space-x-2">
        {selectedShareLink.length === 1 && (
          <Eye
            size={28}
            className="text-slate-400 hover:text-slate-200 cursor-pointer"
            // onClick={() => handleSetAction('view')}
          />
        )}
        <VSeparator />

        {selectedShareLink.length > 0 && (
          <>
            <DownloadCloud
              size={28}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
              onClick={() => handleSetAction("download")}
            />
            <VSeparator />
          </>
        )}
      </div>
    </div>
  );
}

export { ShareLinkBar };
