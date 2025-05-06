import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import MovieDetailPage from "./pages/MovieDetailPage";
import MoviePage from "./pages/MoviePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "popular",
        element: <MoviePage apiMovieType="/popular" />,
      },
      {
        path: "nowplaying",
        element: <MoviePage apiMovieType="/now_playing" />,
      },
      {
        path: "toprated",
        element: <MoviePage apiMovieType="/top_rated" />,
      },
      {
        path: "upcoming",
        element: <MoviePage apiMovieType="/upcoming" />,
      },
      {
        path: "movies/:movieID",
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
    <main className="w-full h-screen flex flex-col">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
