import { createBrowserRouter } from "react-router-dom";
import Movies from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div />,
    errorElement: <h1>error</h1>,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
]);

export default router;
