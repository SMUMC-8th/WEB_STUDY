import { useLocation } from "react-router-dom";
import { MovieType } from "../hooks/useCustomFetch";
import MovieList from "../components/MovieList";

const Main = () => {
  const location = useLocation();

  const getMovieType = (): MovieType => {
    const pathToTypeMap: Record<string, MovieType> = {
      "/": "now_playing",
      "/movies/now_playing": "now_playing",
      "/movies/popular": "popular",
      "/movies/top_rated": "top_rated",
      "/movies/upcoming": "upcoming",
    };
    return pathToTypeMap[location.pathname] || "popular";
  };

  return <MovieList type={getMovieType()} />;
};

export default Main;
