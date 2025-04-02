import MovieDetail from "./movieDetail";
import Credit from "./credit";
function Movie() {
  return (
    <div className="bg-black min-h-screen overflow-y-auto">
      <MovieDetail />
      <Credit />
    </div>
  );
}

export default Movie;
