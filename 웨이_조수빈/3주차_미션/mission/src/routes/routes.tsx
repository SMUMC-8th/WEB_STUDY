import { createBrowserRouter } from "react-router-dom";
import RootLayout from '../layout/root-layout';
import MovieCategory from '../pages/movieCategory'; // ← 카테고리별 목록
import MovieDetail from "../pages/movieDetail";      // ← 영화 상세
import NotFound from "../pages/notFound";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { path: 'movies/:category', element: <MovieCategory /> }, // 인기, 상영중, etc
      { path: 'movie/:id', element: <MovieDetail /> }           // 영화 하나 상세보기
    ]
  }
]);

export default router;
