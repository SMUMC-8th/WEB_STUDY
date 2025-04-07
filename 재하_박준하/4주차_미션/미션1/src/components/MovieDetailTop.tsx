import { MovieDetail } from "../types/movie";

interface props {
  movie: MovieDetail;
}

export default function MovieDetailTop({ movie }: props) {
  return (
    <section className="relative box-border w-full h-[50vh] p-6 flex justify-center items-center">
      {movie.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          className="w-full h-full object-cover rounded-2xl"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-gray-500"></div>
      )}
      <article className="absolute inset-0 w-[50%] sm:w-[30%] h-full p-6">
        <main className="box-border w-full h-full p-2 sm:p-5 rounded-2xl opacity-70 bg-black text-white">
          <h1 className="text-md sm:text-2xl break-words">{`${movie.title}`}</h1>
          <div className="truncate">
            <p className="text-sm sm:text-md pt-2">{`평점 ${movie.vote_average.toFixed(
              1
            )}`}</p>
            <p className="text-sm sm:text-md">{`${movie.release_date.substring(
              0,
              4
            )}`}</p>
            <p className="text-sm sm:text-md">{`${movie.runtime}분`}</p>
          </div>
          <p className="pt-2 text-sm sm:text-md line-clamp-5">{`${movie.overview}`}</p>
        </main>
      </article>
    </section>
  );
}
