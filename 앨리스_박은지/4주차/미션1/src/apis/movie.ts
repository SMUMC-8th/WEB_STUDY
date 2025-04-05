import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export type MovieType = "popular" | "now_playing" | "top_rated" | "upcoming";

export const getMovies = async (type: MovieType, page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/movie/${type}`, {
    params: {
      api_key: API_KEY,
      language: "ko-KR",
      page,
    },
  });
  return response.data;
};

export const getMovieDetail = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      language: "ko-KR",
    },
  });
  return response.data;
};
