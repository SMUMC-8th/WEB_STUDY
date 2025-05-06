import { createBrowserRouter } from "react-router-dom";
import RootLayout from '../layout/root-layout';
import MoviePage from '../pages/MoviePage';
import MovieDetail from "../pages/MovieDetailPage";   
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: 'movies/:page', element: <MoviePage /> }, 
      { path: 'movie/:id', element: <MovieDetail /> }          
    ]
  }
]);

export default router;