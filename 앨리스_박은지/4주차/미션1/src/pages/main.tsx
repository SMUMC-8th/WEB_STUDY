import { useLocation } from "react-router-dom";
import { useCustomFetch, MovieType } from "../hooks/useCustomFetch";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Main = () => {
  const location = useLocation();

  const getMovieType = (): MovieType => {
    switch (location.pathname) {
      case "/":
        return "now_playing";
      case "/movies/popular":
        return "popular";
      case "/movies/now_playing":
        return "now_playing";
      case "/movies/top_rated":
        return "top_rated";
      case "/movies/upcoming":
        return "upcoming";
      default:
        return "popular";
    }
  };

  const { data, loading, error, goToPage, currentPage } = useCustomFetch({
    type: getMovieType(),
  });

  const renderPagination = () => (
    <div className="pagination">
      <button
        className={`pagination-button ${currentPage === 1 ? "disabled" : ""}`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      <span className="pagination-info">
        {currentPage} / {data?.total_pages || 1}
      </span>
      <button
        className={`pagination-button ${
          currentPage === (data?.total_pages || 1) ? "disabled" : ""
        }`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === (data?.total_pages || 1)}
      >
        다음
      </button>
    </div>
  );

  return (
    <div className="container">
      {data && data.total_pages > 1 && renderPagination()}
      {loading ? (
        <div className="loading-content">
          <Loading />
        </div>
      ) : error ? (
        <Error message={error.message} />
      ) : (
        <div className="movie-grid">
          {data?.results.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
