import React from 'react'
import ReactDOM from 'react-dom/client'
/*import App from './UserView/HomePage'*/
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./UserView/HomePage";
import Articles from "./UserView/ArticlesPage";
import Favorites from "./UserView/FavoritesPage";
import ArticlePage from './UserView/ArticlePage';
import ModeratorLogIn from './ModeratorView/ModeratorLogInPage';
import AdminLogIn from './AdminView/AdminLogInPage';
import ModMenu from './ModeratorView/ModerationPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Articles />,
  },
  {
    path: "/:id/favorites",
    element: <Favorites />,
  },
  {
    path: "/:id/article/:id",
    element: <ArticlePage />,
  },
  {
    path: "/dQw4w9WgXcQ(moderator)",
    element: <ModeratorLogIn />,
  },
  {
    path: "/:id/modmenu",
    element: <ModMenu />,
  },
  {
    path: "/temp(admin)",
    element: <AdminLogIn />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
