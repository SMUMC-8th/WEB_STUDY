import { Movie } from "../types/movie";
import MovieListElement from "./MovieListElement";

interface MovieListProps {
  movies: Movie[];
  page: number;
  onPageChange: (value: number) => void;
  onMovieDetail: (movieID: number) => void;
}

export default function MovieList({
  movies,
  page,
  onPageChange,
  onMovieDetail,
}: MovieListProps) {
  return (
    // 버튼과 페이지 수 출력 부분
    <section className="w-full flex-grow-1 flex flex-col">
      <div className="m-6 flex flex-row justify-center items-center">
        {/* page - 1 버튼 */}
        <button
          onClick={() => onPageChange(-1)}
          className={`w-[70px] h-[50px] rounded-xl mr-5 text-white text-xl ${
            page === 1 ? "bg-gray-500" : "bg-pink-300 hover:bg-green-300"
          }`}
          disabled={page === 1 ? true : false} // page값이 1이라면 button 비활성화
        >
          {"<"}
        </button>
        <p className="text-lg">{`${page} 페이지`}</p>
        {/* page + 1 버튼 */}
        <button
          onClick={() => onPageChange(1)}
          className="w-[70px] h-[50px] rounded-xl ml-5 bg-pink-300 hover:bg-green-300 text-white text-xl"
        >
          {">"}
        </button>
      </div>
      <main className="box-border w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
        {movies.map((movie: Movie) => (
          // 영화 grid 표현 부분
          <MovieListElement
            key={movie.id}
            movie={movie}
            onMovieDetail={onMovieDetail}
          />
        ))}
      </main>
    </section>
  );
}
