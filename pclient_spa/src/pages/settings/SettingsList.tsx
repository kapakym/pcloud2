"use client";

import {
  FileScan,
  ImageOff,
  ScanFace,
  ScanText,
  SearchX,
  UserSearch,
  UserX,
} from "lucide-react";
import { useMediaActions } from "../../hooks/use-media-actions.hook";
import { useMediaStore } from "../../stores/media.store";
import { TypeMediaActions } from "../../types/media.types";
import { SettingItem } from "../../components/ui/SettingItem/SettingItem";
import { SettingUserProfile } from "../../components/SettingsComponents/SettingUserProfile/SettingUserProfile";

function SettingsList() {
  const { setAction } = useMediaStore((state) => state);

  useMediaActions();

  const handleSetAction = (action: TypeMediaActions) => {
    setAction(action);
  };

  return (
    <div className="w-full h-full flex flex-col select-none">
      <div className="w-full  overflow-y-auto h-full ">
        <div className="flex flex-col p-4 space-y-4">
          <SettingItem title="User profile">
            <SettingUserProfile />
          </SettingItem>
          <SettingItem title="Media tools">
            <div className="flex flex-col space-y-2">
              <div className="flex flex-row items-center space-x-4">
                <ImageOff
                  size={38}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer "
                  onClick={() => handleSetAction("clearFaces")}
                />
                <div className="text-sm">Clear faces</div>
              </div>
              <div className="flex flex-row items-center space-x-4">
                <SearchX
                  size={38}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer "
                  onClick={() => handleSetAction("clearMedia")}
                />
                <div className="text-sm">Clear media</div>
              </div>
              <div className="flex flex-row items-center space-x-4">
                <UserX
                  size={38}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer "
                  onClick={() => handleSetAction("clearCluster")}
                />
                <div className="text-sm">Clear clusters</div>
              </div>
              <div className="flex flex-row items-center space-x-4">
                <UserSearch
                  size={38}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer "
                  onClick={() => handleSetAction("updateClusters")}
                />
                <div className="text-sm">Update clusters</div>
              </div>

              <div className="flex flex-row items-center space-x-4 ">
                <ScanFace
                  size={38}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer"
                  onClick={() => handleSetAction("scanFaces")}
                />
                <div className="text-sm">Scan faces</div>
              </div>

              <div className="flex flex-row items-center space-x-4 ">
                <FileScan
                  size={38}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer"
                  onClick={() => handleSetAction("scanAll")}
                />
                <div className="text-sm">Scan media</div>
              </div>

              <div className="flex flex-row items-center space-x-4 ">
                <ScanText
                  size={38}
                  className="text-slate-400 hover:text-slate-200 cursor-pointer"
                  onClick={() => handleSetAction("scanText")}
                />
                <div className="text-sm">Recognize text in photos</div>
              </div>
            </div>
          </SettingItem>
        </div>
      </div>
    </div>
  );
}

export { SettingsList };
