class DASHBOARD {
  private root = "admin";

  HOME = this.root;
  AUTH = "/";
  REGISTER = "/register";
  FILE_EXPLORER = "/explorer/files";
  MEDIA_EXPLORER = "/explorer/media";
  FACES_EXPLORER = "/explorer/faces";
  ADMIN_EXPLORER = "/explorer/admin";
  SETTINGS_EXPLORER = "/explorer/settings";
  SHARE_EXPLORER = "/explorer/share";
  SHARE_LINK = "/viewshare/:uuid";
}

export const DASHBOARD_PAGES = new DASHBOARD();

export const AUTH_IGNORE_PAGES = [DASHBOARD_PAGES.AUTH];
