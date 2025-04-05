import { Link } from "react-router-dom";

interface TMovie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const MovieCard = ({ id, title, poster_path, overview }: TMovie) => {
  return (
    <Link to={`/movie/${id}`} className="movie-card">
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          loading="lazy"
        />
        <div className="movie-overlay">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-overview">{overview}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
