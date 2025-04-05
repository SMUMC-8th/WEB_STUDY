import { MovieCredits, castType } from "../types/movie";
import MovieCastElement from "./MovieCastElement";

interface props {
  movie: MovieCredits;
}

export default function MovieDetailBtm({ movie }: props) {
  return (
    <section className="box-border px-6 py-8 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6">
      {movie.cast.map((humanInfo: castType) => (
        <MovieCastElement key={humanInfo.cast_id} cast={humanInfo} />
      ))}
    </section>
  );
}
