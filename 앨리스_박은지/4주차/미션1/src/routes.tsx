import { createBrowserRouter } from "react-router-dom";
import Main from "./pages/main";
import MovieDetail from "./pages/movieDetail";
import Navbar from "./components/Navbar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="layout">
        <Navbar />
        <main>
          <Main />
        </main>
      </div>
    ),
  },
  {
    path: "/movies/popular",
    element: (
      <div className="layout">
        <Navbar />
        <main>
          <Main />
        </main>
      </div>
    ),
  },
  {
    path: "/movies/now_playing",
    element: (
      <div className="layout">
        <Navbar />
        <main>
          <Main />
        </main>
      </div>
    ),
  },
  {
    path: "/movies/top_rated",
    element: (
      <div className="layout">
        <Navbar />
        <main>
          <Main />
        </main>
      </div>
    ),
  },
  {
    path: "/movies/upcoming",
    element: (
      <div className="layout">
        <Navbar />
        <main>
          <Main />
        </main>
      </div>
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <div className="layout">
        <Navbar />
        <main>
          <MovieDetail />
        </main>
      </div>
    ),
  },
]);

export default router;
