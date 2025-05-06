import { Movie } from "../../../미션2/src/types/movie";
import defaultImage from "../assets/images/default-image.avif";

interface props {
  movie: Movie;
  onMovieDetail: (movieID: number) => void;
}

export default function MovieListElement({ movie, onMovieDetail }: props) {
  return (
    <div key={movie.id} className="relative group rounded-2xl">
      {movie.poster_path ? (
        <img
          className="box-border p-2 rounded-2xl group-hover:blur-sm"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        ></img>
      ) : (
        <img
          className="box-border p-2 rounded-2xl w-full h-full object-cover group-hover:blur-sm"
          src={defaultImage}
        ></img>
      )}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                          flex flex-col justify-center items-center p-6"
        onClick={() => onMovieDetail(movie.id)}
      >
        <h3 className="mb-2 text-white text-lg text-center overflow-hidden">
          {movie.title}
        </h3>
        <p className="line-clamp-3 text-white text-center">{movie.overview}</p>
      </div>
    </div>
  );
}
