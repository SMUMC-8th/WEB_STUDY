// components/MovieGrid.tsx
import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../hooks/useCustomFetch";

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid = ({ movies }: MovieGridProps) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
