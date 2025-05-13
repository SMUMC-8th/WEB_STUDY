import axios from "axios";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

export type MovieType = "popular" | "now_playing" | "top_rated" | "upcoming";

export const getMovies = async (type: MovieType, page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/${type}`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
    params: {
      language: "ko-KR",
      page,
    },
  });
  return response.data;
};

export const getMovieDetail = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${TMDB_TOKEN}`,
    },
    params: {
      language: "ko-KR",
    },
  });
  return response.data;
};
