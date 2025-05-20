import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import React from "react";

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
