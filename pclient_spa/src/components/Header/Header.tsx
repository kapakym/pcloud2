"use client";

import { LucideCloudy, Menu } from "lucide-react";
import { useDrawerStore } from "../../stores/drawer.store";
import { NavigationMenu } from "../NavigationMenu/NavigationMenu";

interface HeaderProps {
  isShareMode?: boolean;
}

function Header(props: HeaderProps) {
  const { isShareMode = false } = props;
  const { setOpen, setChildrenDrawer, setTitle } = useDrawerStore(
    (state) => state
  );

  const handleOpenMenu = () => {
    setChildrenDrawer(<NavigationMenu />);
    setTitle("Menu");
    setOpen(true);
  };

  return (
    <div className="w-full flex justify-between p-2 items-center bg-gray-800">
      <div className="flex space-x-1">
        <a
          href="https://github.com/kapakym/pcloud2"
          target="_blank"
          className="flex space-x-2"
        >
          <LucideCloudy size={34} />
          <h2>pCloud2</h2>
        </a>
      </div>
      <div className="cursor-pointer lg:hidden block" onClick={handleOpenMenu}>
        {!isShareMode && <Menu size={32} className="text-slate-300" />}
      </div>
    </div>
  );
}

export { Header };
