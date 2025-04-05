import { createBrowserRouter } from "react-router-dom";
import Movies from "../pages/Movies";

const router=createBrowserRouter([
    {
        path: '/',
        element:<div />,
        errorElement: <h1>error</h1>,
    },

    {
        path:'/Movies',
        element: <Movies />
    },
]);

export default router;