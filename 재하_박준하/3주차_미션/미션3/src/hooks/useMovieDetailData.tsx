import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface argument {
  endURL: string;
  paramsApiUrl: string[];
}

function useMovieDetailData<T>({ endURL, paramsApiUrl }: argument) {
  const [movie, setMovie] = useState<T | null>(null);
  const [error, setError] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const paramsCurUrl = useParams();
  const baseUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/${
    paramsCurUrl.movieID
  }${endURL}`;
  const queryString = paramsApiUrl.join("&");
  const fetchURL = `${baseUrl}?${queryString}`;

  // api 호출 function
  async function getMovieAPI() {
    try {
      const { data } = await axios.get<T>(fetchURL, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
      });
      setMovie(data);
      setIsLoading(false);
    } catch (err: unknown) {
      // axiosError일 경우 처리
      setError(axios.isAxiosError(err) ? err.response?.status || 500 : 500);
    }
  }

  useEffect(() => {
    getMovieAPI();
  }, []);

  return { movie: movie, error: error, isLoading: isLoading };
}

export default useMovieDetailData;
