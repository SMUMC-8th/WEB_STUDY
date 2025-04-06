import { MovieResponse } from "../types/movie";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";
import { curLanguageType } from "../types/movieState";
import useFetchHook from "../hooks/useMovieDetailData";

interface MovieDetailData {
  movie: MovieResponse | null;
  error: number | null;
  isLoading: boolean;
}

export default function MoviePage() {
  const [page, setPage] = useState<number>(1);
  const category = useParams().category;
  const { movie, error, isLoading }: MovieDetailData =
    useFetchHook<MovieResponse>({
      endURL: `/${category}`,
      paramsApiUrl: [`language=${curLanguageType}`, `page=${page}`],
    });
  const navigate = useNavigate();

  useEffect(() => {
    // category가 변경되면 page1 부터 보여주기
    if (page !== 1) setPage(1);
  }, [category]);

  function handlePageChange(value: number): void {
    setPage((prevPage) => prevPage + value);
  }

  function moveMovieDetail(movieID: number): void {
    navigate(`/movie/${movieID}`);
  }

  if (error) return <ErrorPage value={error} />;
  if (isLoading) return <Loading />;
  if (!movie) return <ErrorPage value={500} />;

  // 최우선으로 error 유무 검사
  // error가 아니라면 api를 들고 왔는지 여부 검사
  return (
    <MovieList
      movies={movie.results}
      page={page}
      onPageChange={handlePageChange}
      onMovieDetail={moveMovieDetail}
    />
  );
}
