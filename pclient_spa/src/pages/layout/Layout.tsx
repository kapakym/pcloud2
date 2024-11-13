import { Route, Routes, useLocation } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { NavigationMenu } from "../../components/NavigationMenu/NavigationMenu";
import { useDrawerStore } from "../../stores/drawer.store";
import { mainRoutes } from "../../routes/routes";
import { StatusBar } from "../../components/StatusBar/StatusBar";
import { Drawer } from "../../components/ui/Drawer/Drawer";
import { DASHBOARD_PAGES } from "../../config/page-url.config";
import { UseWsTasks } from "../../hooks/use-wstasks.hook";

export function Layout() {
  const location = useLocation();
  const { open, childrenDrawer, onClose, title } = useDrawerStore(
    (state) => state
  );

  const isLoginOrRegisterPage =
    location.pathname === DASHBOARD_PAGES.AUTH ||
    location.pathname === DASHBOARD_PAGES.REGISTER ||
    location.pathname.includes("viewshare");

  if (!isLoginOrRegisterPage) UseWsTasks();

  return (
    <div className="   flex flex-col  overflow-hidden w-[100dvw] h-[100dvh]">
      {!isLoginOrRegisterPage && <Header />}
      <div className="flex h-full  overflow-hidden">
        {!isLoginOrRegisterPage && (
          <div className="hidden lg:flex w-1/4 bg-gray-800 border-[1px] border-solid border-slate-600 rounded-lb-xl">
            <NavigationMenu />
          </div>
        )}
        <div className="h-full overflow-hidden relative  w-full ">
          <Routes>
            {!!mainRoutes?.length &&
              mainRoutes.map((item) => (
                <Route
                  path={item.path}
                  key={item.path}
                  element={item.element}
                />
              ))}
          </Routes>
        </div>
      </div>
      {!isLoginOrRegisterPage && <StatusBar />}
      {!isLoginOrRegisterPage && (
        <Drawer open={open} onClose={onClose} title={title}>
          {childrenDrawer}
        </Drawer>
      )}
    </div>
  );
}
