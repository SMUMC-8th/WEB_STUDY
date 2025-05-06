import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import { useState, useEffect } from "react";

export default function Popular() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovieAPI = async () => {
      const data = await axios.get<MovieResponse>(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      setMovies(data.data.results);
    };

    getMovieAPI();
  }, []);

  return (
    <main className="box-border w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
      {movies.map((movie) => {
        return (
          <div key={movie.id} className="relative group rounded-2xl">
            <img
              className="box-border p-2 rounded-2xl group-hover:blur-sm"
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            ></img>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
											flex flex-col justify-center items-center p-6"
            >
              <h3 className="mb-2 text-white text-lg text-center overflow-hidden">
                {movie.title}
              </h3>
              <p className="line-clamp-3 text-white text-center">
                {movie.overview}
              </p>
            </div>
          </div>
        );
      })}
    </main>
  );
}

