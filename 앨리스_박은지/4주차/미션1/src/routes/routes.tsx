import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/main";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/",
    element: <div></div>,
  },
]);
export default router;
