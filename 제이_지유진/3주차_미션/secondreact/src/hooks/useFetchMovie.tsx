import { useState, useEffect } from "react";
import axios from "axios";

const useFetchMovies = (category: string, page: number) => {
  const [data, setData] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/movie/${category}?language=ko&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setData(response.data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [category, page]);

  return { data, isPending, isError };
};

export default useFetchMovies;
