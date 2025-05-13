import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/Loadingspinner";
import type { TMovie, TMovieResponse } from "../types/movie";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentPage = Number(searchParams.get("page")) || 1;

  const fetchMovies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await axios.get<TMovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );

      if (
        !response.data ||
        !response.data.results ||
        !response.data.total_pages
      ) {
        throw new Error("영화 데이터 형식이 올바르지 않습니다.");
      }

      setMovies(response.data.results as TMovie[]);

      const maxPages = Math.min(response.data.total_pages, 500);
      setTotalPages(maxPages);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setError(
        error instanceof Error
          ? error.message
          : "영화 데이터를 불러오는데 실패했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams({ page: newPage.toString() });
  };

  const handlePageJump = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pageInput = (
      e.currentTarget.elements.namedItem("page") as HTMLInputElement
    ).value;
    const pageNum = Number(pageInput);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
    }
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
      <form onSubmit={handlePageJump} className="page-jump-form">
        <input
          type="number"
          name="page"
          min="1"
          max={totalPages}
          placeholder="이동할 페이지"
          className="page-input"
        />
        <button type="submit" className="page-jump-button">
          이동
        </button>
      </form>
    </div>
  );

  if (isLoading) {
    return (
      <div className="container">
        {renderPagination()}
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-button" onClick={fetchMovies}>
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      {renderPagination()}
      <div className="movie-grid">
        {movies.map((movie: TMovie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
            release_date={movie.release_date}
            overview={movie.overview}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
