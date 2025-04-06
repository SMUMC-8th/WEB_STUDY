import axios from "axios";
import { useState, useEffect, useRef } from "react";

interface argument {
  endURL: string;
  paramsApiUrl: string[];
}

export default function useFetchHook<T>({ endURL, paramsApiUrl }: argument) {
  const [movie, setMovie] = useState<T | null>(null);
  const [error, setError] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const abortControllerRef = useRef<AbortController | null>(null);
  // url 조합
  const baseUrl = `${import.meta.env.VITE_TMDB_BASE_URL}${endURL}`;
  const queryString = paramsApiUrl.join("&");
  const fetchURL = `${baseUrl}?${queryString}`;

  async function getMovieAPI() {
    // 새로운 AbortController 생성
    // controller.abort()를 호출하면, 이 controller.signal과 연결된 요청에만 중단 신호가 전달됩니다
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const { data } = await axios.get<T>(fetchURL, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          accept: "application/json",
        },
        // 이 요청은 controller가 관리하니까,
        // 만약 controller.abort()가 호출되면 즉시 요청을 중단해! 라는 의미
        signal: controller.signal,
      });
      setMovie(data);
      setIsLoading(false);
    } catch (err: unknown) {
      if (!axios.isCancel(err)) {
        setError(axios.isAxiosError(err) ? err.response?.status || 500 : 500);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    getMovieAPI();

    return () => {
      // 동일한 page에서 하나의 hook으로 두번 url을 요청 할 경우 먼저 보낸 요청 취소
      if (abortControllerRef.current) abortControllerRef.current.abort();
      setIsLoading(true);
    };
  }, [endURL, queryString]);

  return { movie, error, isLoading };
}
