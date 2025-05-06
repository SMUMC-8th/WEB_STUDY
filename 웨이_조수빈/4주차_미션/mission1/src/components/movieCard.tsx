// movieCard.tsx
export type TMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

type Props = {
  movie: TMovie;
};

function MovieCard({ movie }: Props) {
  return (
    <div
      className="group relative cursor-pointer overflow-hidden transition-transform duration-300 transform hover:scale-105"
      onClick={() => (window.location.href = `/movie/${movie.id}`)} // ← 상세 페이지로 이동
    >
      <img
        className="rounded-lg h-[350px] w-full object-cover transition-opacity duration-300 group-hover:opacity-30"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <div className="absolute inset-0 flex flex-col items-start justify-center text-white bg-black/40 p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 gap-2">
        <div className="font-bold text-lg text-left">{movie.title}</div>
        <div className="line-clamp-3 text-left text-sm">{movie.overview}</div>
        <div className="flex gap-3">
          <div className="line-clamp-3 text-left text-xs">⭐{movie.vote_average}</div>
          <div className="text-xs text-left">👍🏻{movie.vote_count}</div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
