import { useSearchParams, useLocation } from "react-router-dom";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const currentPage = Number(searchParams.get("page")) || 1;

  const popularMovies = usePopularMovies(currentPage);
  const nowPlayingMovies = useNowPlayingMovies(currentPage);
  const topRatedMovies = useTopRatedMovies(currentPage);
  const upcomingMovies = useUpcomingMovies(currentPage);

  const getCurrentMovies = () => {
    switch (location.pathname) {
      case "/":
        return nowPlayingMovies;
      case "/movies/popular":
        return popularMovies;
      case "/movies/now_playing":
        return nowPlayingMovies;
      case "/movies/top_rated":
        return topRatedMovies;
      case "/movies/upcoming":
        return upcomingMovies;
      default:
        return popularMovies;
    }
  };

  const { movies, totalPages, loading, error } = getCurrentMovies();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  const renderPagination = () => (
    <div className="pagination">
      <button
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <span className="pagination-info">
        {currentPage} / {totalPages}
      </span>
      <button
        className={`pagination-button ${
          currentPage === totalPages ? "disabled" : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );

  return (
    <div className="container">
      {totalPages > 1 && renderPagination()}
      {loading ? (
        <div className="loading-content">
          <Loading />
        </div>
      ) : error ? (
        <Error message={error.message} />
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
