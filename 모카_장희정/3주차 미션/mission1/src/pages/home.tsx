import axios from "axios";
import { useEffect, useState } from "react";
import { TMovie } from "../components/movieCard";
import MovieCard from "../components/movieCard";
// import <Movie> </Movie

const Movies = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
          },
        }
      );
      setData(response.data.results);
    };
    fetchMovies();
  }, []);
  console.log(data);
  return (
    <div>
      {data.map((movie: TMovie, idx) => {
        return <MovieCard key={idx} {...movie}></MovieCard>;
      })}
      ;
    </div>
  );
};
export default Movies;
