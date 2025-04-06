import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/movieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import type { TMovie } from "../types/movie";

interface MovieResponse {
  results: TMovie[];
  total_pages: number;
}

const Movies = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentPage = Number(searchParams.get("page")) || 1;

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=ko-KR&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );

      if (!response.data) {
        throw new Error("API 응답이 비어있습니다.");
      }

      if (!response.data.results || !response.data.total_pages) {
        throw new Error("영화 데이터 형식이 올바르지 않습니다.");
      }

      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "영화 데이터를 불러오는데 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [category, currentPage]);

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
      {isLoading ? (
        <div className="loading-content">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchMovies}>
            다시 시도
          </button>
        </div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie: TMovie, idx) => (
            <MovieCard {...movie} key={movie.id || idx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
