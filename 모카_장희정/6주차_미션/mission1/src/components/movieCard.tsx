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
    <div className="w-[200px] h-[300px] relative flex-col flex">
      <img
        className="w-full h-full rounded-md"
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
      <div className="absolute left-0 right-0 top-0 bottom-0 opacity-0 hover:opacity-100 hover:bg-black/80 text-white flex justify-center items-center flex-col">
        <div>{movie.title}</div>
        <div className="line-clamp-3">{movie.overview}</div>
        <div>⭐ {movie.vote_count}</div>
      </div>
    </div>
  );
};

// 카드 크기는 부모의 `grid` 설정에 따라 자동 조정

export default MovieCard;
