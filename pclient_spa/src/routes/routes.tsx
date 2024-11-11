import { Auth } from "../pages/auth/Auth";
import { MediaList } from "../pages/media/MediaList";

export interface IMenuItem {
  element: React.ReactNode;
  path: string;
}

export const mainRoutes: IMenuItem[] = [
  {
    element: <Auth />,
    path: "/",
  },
  {
    element: <MediaList />,
    path: "/files_list",
  },
  {
    element: <MediaList />,
    path: "/registration",
  },
  {
    element: <MediaList />,
    path: "/viewshare/:uuid",
  },
  {
    element: <MediaList />,
    path: "/userlist",
  },

  {
    element: <MediaList />,
    path: "/sharedlinkslist",
  },
];
