import { Header } from "../Header/Header";
import { type PropsWithChildren } from "react";

function ShareLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className=" min-h-screen  flex flex-col h-screen max-h-screen overflow-hidden">
      <Header isShareMode />
      <div className="flex h-full  overflow-hidden">
        <div className="h-full overflow-hidden relative  w-full ">
          {children}
        </div>
      </div>
    </div>
  );
}

export { ShareLayout };
