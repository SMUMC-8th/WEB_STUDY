import MovieCard, { TMovie } from "../components/movieCard";
import Spinner from "../components/spinner";
import { useCustomFetch } from "../hooks/useCustomFetch";

const Movies = () => {
  const { data, loading, error } = useCustomFetch<{ results: TMovie[] }>(
    `https://api.themoviedb.org/3/movie/popular?language=ko&page=1`
  );

  if (loading) return <Spinner />;
  if (error) return <p className="text-white p-6">{error}</p>;
  if (!data) return null;

  return (
    <div className="w-full p-10 grid grid-cols-4 gap-10">
      {data.results.map((movie: TMovie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default Movies;