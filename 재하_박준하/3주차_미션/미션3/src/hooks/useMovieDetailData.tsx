import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function useMovieDetailData<T>(endURL: string) {
  const [movie, setMovie] = useState<T | null>(null);
  const [error, setError] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const params = useParams();

  // api 호출 function
  async function getMovieAPI() {
    try {
      const { data } = await axios.get<T>(
        `${import.meta.env.VITE_TMDB_BASE_URL}/${params.movieID}${endURL}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );
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
