import { useState } from "react";
import MovieCard from "../components/movieCard";
import { TMovie } from "../components/movieCard";
import Pagination from "../components/PageNation";
import LoadingSpinner from "../components/LoadingSpinner";
import useFetchMovies from "../hooks/useFetchMovie";
function Upcoming() {
  const [page, setPage] = useState(1);
  const { data, isPending, isError } = useFetchMovies("upcoming", page);
  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
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

export default Upcoming;
