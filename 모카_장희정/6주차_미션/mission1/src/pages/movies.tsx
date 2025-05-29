import { useEffect, useState } from "react";
import MovieCard from "../components/movieCard";
import axios from "axios";
import Loading from "../loading/loading";

export type TMovie = {
  adult: boolean;
  title: string;
  overview: string;
  vote_count: number;
  poster_path: string;
  id: number;
};

const Movies = () => {
  const params = document.location.pathname.split("/")[1];

  const [isLoading, setIsLoading] = useState(true); // ✅ 선언 먼저!
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios(
          `https://api.themoviedb.org/3/movie/${params}?language=ko-KR&page=100`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setData(response.data.results);
      } catch (error) {
        console.error("데이터 요청 에러:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [params]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <div className="relative min-h-screen flex flex-wrap w-full justify-center gap-[10px]">
        {data.map((movie: TMovie, idx) => (
          <MovieCard key={idx} {...movie} />
        ))}

        {/* {!isLoading && <Loading />} */}
      </div>

      <div className="flex justify-center mt-10">
        <button> </button>
      </div>
    </div>
  );
};

export default Movies;
