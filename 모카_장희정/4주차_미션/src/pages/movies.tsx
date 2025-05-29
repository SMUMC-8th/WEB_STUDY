import { useParams } from "react-router-dom";
import { MovieType } from "../hooks/useCustomFetch";
import MovieList from "../components/MovieList";

const Movies = () => {
  const { category } = useParams<{ category: string }>();

  const getMovieType = (): MovieType => {
    const categoryToTypeMap: Record<string, MovieType> = {
      popular: "popular",
      now_playing: "now_playing",
      top_rated: "top_rated",
      upcoming: "upcoming",
    };
    return categoryToTypeMap[category || ""] || "popular";
  };

  return <MovieList type={getMovieType()} />;
};

export default Movies;
