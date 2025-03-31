import MovieDetailTop from "../components/MovieDetailTop";
import MovieDetailBtm from "../components/MovieDetailBtm";

export default function MovieDetailPage() {
  return (
    <main className="w-full flex-grow-1 flex flex-col">
      <MovieDetailTop />
      <h1 className="pl-8 pb-6 text-left text-3xl">출연</h1>
      <MovieDetailBtm />
    </main>
  );
}
