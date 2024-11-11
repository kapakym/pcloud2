import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header/Header";
import { NavigationMenu } from "./components/NavigationMenu/NavigationMenu";
import { StatusBar } from "./components/StatusBar/StatusBar";
import { Drawer } from "./components/ui/Drawer/Drawer";
import { useDrawerStore } from "./stores/drawer.store";
import { mainRoutes } from "./routes/routes";

function App() {
  const { open, childrenDrawer, onClose, title } = useDrawerStore(
    (state) => state
  );
  return (
    <div className="   flex flex-col  overflow-hidden w-[100dvw] h-[100dvh]">
      <Header />

      <div className="flex h-full  overflow-hidden">
        <div className="hidden lg:flex w-1/4 bg-gray-800 border-[1px] border-solid border-slate-600 rounded-lb-xl">
          <NavigationMenu />
        </div>
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
      <StatusBar />
      <Drawer open={open} onClose={onClose} title={title}>
        {childrenDrawer}
      </Drawer>
    </div>
  );
}

export default App;
