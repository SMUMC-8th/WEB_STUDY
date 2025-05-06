import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard, { TMovie } from "../components/movieCard";
import Spinner from "../components/spinner"; // 스피너
import Pagination from "../components/pagination"; // 페이지네이션


export default function MovieCategory() {
  const { category } = useParams();
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 여부
  const [page, setPage] = useState(1);               // 현재 페이지
  const [totalPages, setTotalPages] = useState(1);   // 전체 페이지 수


  useEffect(() => {
    setPage(1); // 카테고리 바뀌면 1페이지로 초기화
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
        setTotalPages(response.data.total_pages); // 총 페이지 수 저장
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
        {/* <h1 className="text-3xl font-bold mb-4">{category?.toUpperCase()}</h1> */}
        {/* 없는게 더 예쁜 듯 */}

        {loading ? (
            <Spinner />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
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
              window.scrollTo({ top: 0, behavior: "smooth" }); //위로 올라가게
            }}
          />
        )}
    </div>
    </>
  );
  
}


