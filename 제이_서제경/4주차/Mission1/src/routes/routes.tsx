import { createBrowserRouter } from "react-router-dom";
import MoviePage from "../pages/MoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div />,
    errorElement: <h1>Error</h1>,
  },
  {
    path: "/MoviePage",
    element: <MoviePage />,
  },
]);

export default router;
