import axios from "axios";
import { useEffect, useState } from "react";
import { TMovie } from "../components/movieCard";
import MovieCard from "../components/movieCard";
// import <Movie> </Movie

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=100`,
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
    <div className="flex flex-wrap w-full justify-center gap-[10px]">
      {data.map((movie: TMovie, idx) => {
        return <MovieCard key={idx} {...movie}></MovieCard>;
      })}
      ;
    </div>
  );
};
export default Home;
