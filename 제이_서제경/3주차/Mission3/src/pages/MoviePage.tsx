import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/moivieCard";
import { Movie, MovieResponse } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  //1. 로딩상태
  const [isPending, setIsPending] = useState(false);

  //2. 에러상태
  const [isError, setIsError] = useState(false);

  //3. 페이지
  const [page, setPage] = useState(1);

  // 4. URL 파라미터 읽기 - URL에서 category 값을 가져와서 API에 사용
  const { category } = useParams<{
    category: string;
  }>();

  // 5. API 호출
  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);

      try {
        const response = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        setMovies(response.data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovies();
  }, [page, category]);

  // 6. 에러 처리
  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          className="p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200
    transition disabled:text-gray-400 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-sm text-gray-500 tracking-wide">
          {page} 페이지
        </span>

        <button
          className="p-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 active:bg-gray-200
    transition"
          onClick={() => setPage((prev) => prev + 1)}
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {isPending && (
        <div className="flex items-center justify-center h-dvh backdrop-blur-sm bg-white/70 rounded-full p-3">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
