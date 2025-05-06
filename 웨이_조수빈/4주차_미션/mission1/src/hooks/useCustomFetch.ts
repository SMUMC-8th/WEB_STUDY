import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

export function useCustomFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        });
        setData(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        setError(axiosError.message || "데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [url]);

  return { data, loading, error };
}
