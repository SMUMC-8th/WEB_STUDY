import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCredit = (id: string | undefined) => {
  const [credit, setCredit] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchCredit = async () => {
      setIsPending(true);
      setIsError(false);
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/movie/${id}/credits?language=ko`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setCredit(response.data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchCredit();
  }, [id]);

  return { credit, isPending, isError };
};

export default useFetchCredit;
