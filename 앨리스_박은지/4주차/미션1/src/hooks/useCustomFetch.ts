import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getMovies } from "../apis/movie";

export type MovieType = "popular" | "now_playing" | "top_rated" | "upcoming";

interface UseCustomFetchProps {
  type: MovieType;
  page?: number;
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
  page: number;
}

export const useCustomFetch = ({ type, page = 1 }: UseCustomFetchProps) => {
  const [data, setData] = useState<MovieResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getMovies(type, page);
        setData(response);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("알 수 없는 오류가 발생했습니다.")
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, page]);

  const goToPage = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage.toString());
    setSearchParams(newSearchParams);
  };

  return { data, loading, error, goToPage, currentPage: page };
};
