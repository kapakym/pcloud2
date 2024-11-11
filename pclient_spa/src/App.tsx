import "./App.css";
import { Header } from "./components/Header/Header";
import { NavigationMenu } from "./components/NavigationMenu/NavigationMenu";
import { StatusBar } from "./components/StatusBar/StatusBar";
import { Drawer } from "./components/ui/Drawer/Drawer";
import { useDrawerStore } from "./stores/drawer.store";

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
          {/* {children} */}
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
