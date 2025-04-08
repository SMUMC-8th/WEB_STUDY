import { useParams } from "react-router-dom";
import MovieCard, { TMovie } from "../components/movieCard";
import Spinner from "../components/spinner";
import Pagination from "../components/pagination";
import { useCustomFetch } from "../hooks/useCustomFetch";
import { useEffect, useState } from "react";

export default function MovieCategory() {
  const { category } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category]);

  const {
    data,
    loading,
    error
  } = useCustomFetch<{ results: TMovie[]; total_pages: number }>(
    `https://api.themoviedb.org/3/movie/${category}?language=ko&page=${page}`
  );

  return (
    <>
      <div className="p-6">
        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-white">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {data?.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
      <div>
        {!loading && data && (
          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </div>
    </>
  );
}


