import { useState, useEffect } from "react";
import axios from "axios";

type TMovieDetail = {
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  runtime: number;
};

const useFetchMovieDetail = (id: string | undefined) => {
  const [detail, setDetail] = useState<TMovieDetail | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetail = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/movie/${id}?language=ko`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setDetail(response.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  return { detail, isPending, isError };
};

export default useFetchMovieDetail;
