export type TMovie = {
  adult: boolean;
  title: string;
  overview: string;
  vote_count: number;
  poster_path: string;
  id: number;
};

function MovieCard(movie: TMovie) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105"
      onClick={() => (window.location.href = `/movies/${movie.id}`)}
    >
      <img
        className="rounded-lg h-[300px] w-full object-cover transition-opacity duration-300 group-hover:opacity-30"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="absolute inset-0 flex flex-col items-start justify-center text-white bg-black bg-opacity-30 p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="font-bold text-lg text-left">{movie.title}</div>
        <div className="text-sm line-clamp-3 text-left">{movie.overview}</div>
        <div className="mt-2 text-xs text-left">좋아요: {movie.vote_count}</div>
      </div>
    </div>
  );
}

export default MovieCard;
