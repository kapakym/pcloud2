import { DASHBOARD_PAGES } from "../config/page-url.config";
import { Auth } from "../pages/auth/Auth";
import { MediaList } from "../pages/media/MediaList";
import { MediaList as FacesMediaList } from "../pages/faces/MediaList";
import { FilesList } from "../pages/files/FilesList";
import { ShareList } from "../pages/share/ShareList";
import { SettingsList } from "../pages/settings/SettingsList";
import { UsersList } from "../pages/admin/UsersList";
import { ShareLink } from "../pages/shareid/ShareLink";
import { Register } from "../pages/register/Register";

export interface IMenuItem {
  element: React.ReactNode;
  path: string;
}

export const mainRoutes: IMenuItem[] = [
  {
    element: <Auth />,
    path: DASHBOARD_PAGES.AUTH,
  },
  {
    element: <FilesList />,
    path: DASHBOARD_PAGES.FILE_EXPLORER,
  },
  {
    element: <MediaList />,
    path: DASHBOARD_PAGES.MEDIA_EXPLORER,
  },
  {
    element: <FacesMediaList />,
    path: DASHBOARD_PAGES.FACES_EXPLORER,
  },
  {
    element: <ShareList />,
    path: DASHBOARD_PAGES.SHARE_EXPLORER,
  },

  {
    element: <SettingsList />,
    path: DASHBOARD_PAGES.SETTINGS_EXPLORER,
  },

  {
    element: <UsersList />,
    path: DASHBOARD_PAGES.ADMIN_EXPLORER,
  },

  {
    element: <ShareLink />,
    path: DASHBOARD_PAGES.SHARE_LINK,
  },

  {
    element: <Register />,
    path: DASHBOARD_PAGES.REGISTER,
  },
];
