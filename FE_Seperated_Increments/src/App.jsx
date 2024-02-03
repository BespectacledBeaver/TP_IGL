import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from "./UserView/HomePage"
import ArticlesPage from "./UserView/ArticlesPage"
import ArticlePage from "./UserView/ArticlePage"

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/user",
      element: <ArticlesPage />,
    },
    {
      path: "/article:id",
      element: <ArticlePage />,
    },
  ])

  return (
      <RouterProvider router={router} />
  )
}