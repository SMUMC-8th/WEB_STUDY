import { TMovie } from "../components/movieCard";
import { useState } from "react";
import MovieCard from "../components/movieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/PageNation";
import useFetchMovies from "../hooks/useFetchMovie";
function TopRated() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useFetchMovies("top_rated", page);
  if (isError) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-red-500 text-2xl whitespace-pre-line">
          에러가 발생했습니다. <br />
          사이트를 새로고침 해주세요.
        </span>
      </div>
    );
  }
  return (
    <>
      <Pagination page={page} onPageChange={setPage} />
      {isPending && (
        <div>
          <LoadingSpinner />
        </div>
      )}
      {!isPending && (
        <div className="flex flex-wrap gap-4 justify-center items-center bg-black min-h-screen">
          {data.map((movie: TMovie, idx) => {
            return <MovieCard {...movie} key={idx} />;
          })}
        </div>
      )}
    </>
  );
}

export default TopRated;
