import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";

import axios from "axios";

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // 응답에 대한 타입을 정의해줍니다.
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`
      );

      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return <></>;
};

export default MoviesPage;
