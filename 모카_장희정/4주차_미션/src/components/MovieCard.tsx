import React from "react";
import { Link } from "react-router-dom";
import profileImage from "../assets/Profile.png";

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

const MovieCard = ({ id, title, poster_path, overview }: MovieCardProps) => {
  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <div className="movie-poster">
        <img
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : profileImage
          }
          alt={title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = profileImage;
          }}
        />
      </div>
      <div className="movie-overlay">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-overview">{overview}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
