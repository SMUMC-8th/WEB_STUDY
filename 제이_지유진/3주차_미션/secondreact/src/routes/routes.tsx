import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout"; // Layout 컴포넌트 경로를 맞춰주세요.
import Movie from "../pages/movie";
import PopularMovies from "../pages/PopularMovies";
import Upcoming from "../pages/UpcomingMovies";
import TopRated from "../pages/TopRatedMovies";
import Nowplaying from "../pages/NowplayingMovies";
import Home from "../pages/home";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, //Layout을 최상위 경로에 배치
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies/popular",
        element: <PopularMovies />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/movies/Upcoming",
        element: <Upcoming />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/movies/top_rated",
        element: <TopRated />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/movies/nowplaying",
        element: <Nowplaying />,
        errorElement: <div>404 Not Found</div>,
      },
      {
        path: "/movies/:id",
        element: <Movie />,
      },
    ],
  },
]);

export default router;
