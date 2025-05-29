import { useState, useEffect } from "react";
import axios from "axios";

interface MovieData {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime?: number;
  tagline?: string;
  genres?: { id: number; name: string }[];
}

interface MovieCredits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
  }[];
}

interface UseMovieDataReturn {
  data: MovieData | null;
  credits: MovieCredits | null;
  loading: boolean;
  error: Error | null;
}

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

export const useMovieData = (
  movieId: string | undefined
): UseMovieDataReturn => {
  const [data, setData] = useState<MovieData | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!movieId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const headers = {
          Authorization: `Bearer ${TOKEN}`,
          accept: "application/json",
        };

        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${movieId}?language=ko-KR`, { headers }),
          axios.get(`${BASE_URL}/movie/${movieId}/credits?language=ko-KR`, {
            headers,
          }),
        ]);

        setData(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("An error occurred while fetching movie data")
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [movieId]);

  return { data, credits, loading, error };
};
