import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard, { TMovie } from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner"; 
import Pagination from "../components/pagination";
import NavBar from "../components/navbar";


export default function MovieCategory() {
  const { category } = useParams();
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [loading, setLoading] = useState(true); 
  const [page, setPage] = useState(1);               
  const [totalPages, setTotalPages] = useState(1);   


  useEffect(() => {
    setPage(1); 
  }, [category]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${category}?language=ko&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages); 
      } catch (err) {
        console.error("영화 불러오기 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page]);


  return (
    <>
      <div className="p-6">
  <h1 className="text-3xl font-bold mb-4">{category?.toUpperCase()}</h1>

  {loading ? (
    <LoadingSpinner />
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 max-w-screen-xl mx-auto">
  {movies.map((movie) => (
    <MovieCard key={movie.id} movie={movie} />
  ))}
</div>

  )}
</div>

    <div>
        {!loading && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
    </div>
    </>
  );

}
