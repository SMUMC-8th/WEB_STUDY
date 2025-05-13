import { useCustomFetch, MovieType } from "../hooks/useCustomFetch";
import MovieGrid from "./MovieGrid";
import Loading from "./Loading";
import Error from "./Error";
import Pagination from "./renderPagination";
import React from "react";

interface MovieListProps {
  type: MovieType;
}

const MovieList = ({ type }: MovieListProps) => {
  const { data, loading, error, goToPage, currentPage } = useCustomFetch({
    type,
  });

  return (
    <div className="container">
      {loading ? (
        <div className="loading-content">
          <Loading />
        </div>
      ) : error ? (
        <Error message={error.message} />
      ) : (
        <>
          {data && data.total_pages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={data.total_pages}
              goToPage={goToPage}
            />
          )}
          <MovieGrid movies={data?.results || []} />
        </>
      )}
    </div>
  );
};

export default MovieList;
