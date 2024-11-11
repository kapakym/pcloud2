export const mainRoutes: any[] = [
  {
    element: <LoginPage />,
    path: "/",
  },
  {
    element: <Main />,
    path: "/files_list",
  },
  {
    element: <RegistrationPage />,
    path: "/registration",
  },
  {
    element: <ViewSharePage />,
    path: "/viewshare/:uuid",
  },
  {
    element: <UsersPage />,
    path: "/userlist",
  },

  {
    element: <SharedLinksPage />,
    path: "/sharedlinkslist",
  },
];
