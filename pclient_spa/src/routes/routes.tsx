import { MediaList } from "../pages/MediaList";

export const mainRoutes: any[] = [
  {
    element: <MediaList />,
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
