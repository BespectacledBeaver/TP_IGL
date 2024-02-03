import React from 'react'
import ReactDOM from 'react-dom/client'
/*import App from './UserView/HomePage'*/
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./UserView/HomePage";
import Articles from "./UserView/ArticlesPage";
import Favorites from "./UserView/FavoritesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: ":id/*",
    element: <Articles />,
  },
  {
    path: ":id/favorites",
    element: <Favorites />,
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
