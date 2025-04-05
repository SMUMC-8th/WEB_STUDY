import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import Loading from "../components/Loading";
import MovieList from "../components/MovieList";

interface MoviePageProps {
  apiMovieType: string;
}

export default function MoviePage({ apiMovieType }: MoviePageProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // api 호출 function
  async function fetchMovies() {
    try {
      // axios api call
      const { data } = await axios.get<MovieResponse>(
        `${import.meta.env.VITE_TMDB_BASE_URL}${apiMovieType}${
          import.meta.env.VITE_TMDB_EN
        }${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      setMovies(data.results);
      setIsLoading(false);
    } catch (err: unknown) {
      // axiosError일 경우 처리
      setError(axios.isAxiosError(err) ? err.response?.status || 500 : 500);
    }
  }

  useEffect(() => {
    // page가 1인 상태에서 url만 변경시 fetch하기 위함
    // page가 1인 상태에서 1로 변경하면 react가 변경되었다고 판단하지 않아서 아래 useEffect 실행 x
    if (page === 1) fetchMovies();
    else setPage(1);
    return () => {
      setIsLoading(true);
    };
  }, [apiMovieType]);

  useEffect(() => {
    fetchMovies();
    return () => {
      setIsLoading(true);
    };
  }, [page]);

  function handlePageChange(value: number): void {
    setPage((prevPage) => prevPage + value);
  }

  function moveMovieDetail(movieID: number): void {
    navigate(`/movies/${movieID}`);
  }

  // 최우선으로 error 유무 검사
  // error가 아니라면 api를 들고 왔는지 여부 검사
  return error ? (
    <ErrorPage value={error} />
  ) : isLoading ? (
    <Loading />
  ) : (
    <MovieList
      movies={movies}
      page={page}
      onPageChange={handlePageChange}
      onMovieDetail={moveMovieDetail}
    />
  );
}
