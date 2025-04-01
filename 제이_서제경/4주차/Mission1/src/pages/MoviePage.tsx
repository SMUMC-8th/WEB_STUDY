import MovieCard from "../components/moivieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { useState } from "react";
import { MovieResponse } from "../types/movie";

export default function MoviePage() {
  //3. 페이지
  const [page, setPage] = useState(1);

  // 4. URL 파라미터 읽기 - URL에서 category 값을 가져와서 API에 사용
  const { category } = useParams<{
    category: string;
  }>();

  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;

  const {
    data: movies,
    isPending,
    isError,
  } = useCustomFetch<MovieResponse>(url);

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
          {movies?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
