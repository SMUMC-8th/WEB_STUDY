export type TMovie = {
  adult: boolean;
  title: string;
  overview: string;
  vote_count: number;
  poster_path: string;
  id: number;
};

const MovieCard = (movie: TMovie) => {
  return (
    <div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt=""
      />
      <div>{movie.title}</div>
      <div>{movie.overview}</div>
      <div>{movie.vote_count}</div>
    </div>
  );
};

export default MovieCard;
