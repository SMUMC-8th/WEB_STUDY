import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loadingspinner from "../components/LoadingSpinner";
import HumanCard from "../components/HumanCard";


interface Genre {
  id: number;
  name: string;
}

interface MovieDetailData {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

interface CreditResponse {
  cast: CastMember[];
  crew: CrewMember[];
}

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get<MovieDetailData>(
          `https://api.themoviedb.org/3/movie/${id}?language=ko`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setMovie(response.data);
      } catch (error) {
        console.error("영화 상세 정보 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await axios.get<CreditResponse>(
          `https://api.themoviedb.org/3/movie/${id}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );
        setCast(response.data.cast);
        setCrew(response.data.crew);
      } catch (error) {
        console.error("감독/출연 정보 로딩 실패:", error);
      }
    };

    fetchMovieDetail();
    fetchCredits();
  }, [id]);

  if (loading || !movie) return <Loadingspinner />;
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-[300px] rounded shadow-lg"
        />
        <div className="flex flex-col justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <p className="text-gray-400 text-sm my-3">개봉일: {movie.release_date}</p>
            <div className="mt-2 flex gap-2 flex-wrap cursor-default">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-rose-600 px-2 py-1 text-sm rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-4 text-gray-300 leading-relaxed">{movie.overview}</p>

          <div className="flex items-center gap-4 mt-4 cursor-default">
            <span className="text-yellow-400 text-lg">⭐ {movie.vote_average}</span>
            <span className="text-sm text-gray-400">({movie.vote_count}명 참여)</span>
          </div>
        </div>
      </div>

      {/* 감독/출연 */}
      <div className="mt-14">
        <h1 className="text-2xl font-bold mb-7">감독/출연</h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-6">
          {[...crew.filter(p => p.job === "Director"), ...cast.slice(0, 15)].map((person) => (
            <HumanCard
              key={`${person.id}-${person.name}`}
              name={person.name}
              profile_path={person.profile_path}
              role={"character" in person ? `${person.character} (voice)` : person.job}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;