import { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
}

interface UseNowPlayingMoviesReturn {
  movies: Movie[];
  totalPages: number;
  loading: boolean;
  error: Error | null;
}

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const useNowPlayingMovies = (
  page: number = 1
): UseNowPlayingMoviesReturn => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchNowPlayingMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        const headers = {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        };

        const response = await axios.get(
          `${BASE_URL}/movie/now_playing?language=ko-KR&page=${page}`,
          { headers }
        );

        if (!response.data) {
          throw new Error("API 응답이 비어있습니다.");
        }

        if (!response.data.results || !response.data.total_pages) {
          throw new Error("영화 데이터 형식이 올바르지 않습니다.");
        }

        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("영화 데이터를 불러오는데 실패했습니다.")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNowPlayingMovies();
  }, [page]);

  return { movies, totalPages, loading, error };
};
