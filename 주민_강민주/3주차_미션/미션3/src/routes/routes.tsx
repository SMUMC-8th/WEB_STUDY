import { createBrowserRouter } from "react-router-dom";
import Movies from "../pages/Movies";
import Layout from "../components/Layout";
import MovieDetail from "../components/movieDetail";

const router=createBrowserRouter([
    {
        path: '/',
        element:<Layout />,
        errorElement: <h1>error</h1>,
        children:[
            {
                index: true,
                element: <div>Home Page</div>,
            },
            {
                path: 'movies/:category',
                element: <Movies />,
            },
            {
                path:'movie/:movieId',
                element:<MovieDetail/>,
            }
        ],
    },
]);

export default router;