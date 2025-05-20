import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Layout from "../layout/layout";
import Movies from "../pages/movies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>error</h1>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/popular",
        element: <Movies></Movies>,
      },
      {
        path: "/upcoming",
        element: <Movies></Movies>,
      },
      {
        path: "/now_playing",
        element: <Movies></Movies>,
      },
      {
        path: "/top_rated",
        element: <Movies></Movies>,
      },
    ],
  },
  // {
  //   path: "/movies",
  //   element: <Movies />,
  // },
]);

export default router;
