import { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";
import axios from "axios";

export type TMovie = {
  adult: boolean;
  title: string;
  overview: string;
  vote_count: number;
  poster_path: string;
  id: number;
};

const Movies = () => {
  const params = document.location.pathname.split("/")[1];
  console.log(params);

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${params}?language=ko-KR&page=100`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      setData(response.data.results);
    };
    fetchMovies();
  }, [params]);
  return (
    <div className="flex flex-wrap w-full justify-center gap-[10px]">
      {data.map((movie: TMovie, idx) => {
        return <MovieCard key={idx} {...movie}></MovieCard>;
      })}
      ;
    </div>
  );
};

export default Movies;
