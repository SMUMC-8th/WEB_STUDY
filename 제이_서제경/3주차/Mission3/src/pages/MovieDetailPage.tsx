import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Credit {
  id: number;
  name: string;
  profile_path: string;
  job?: string;
  character?: string;
}

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credit[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        const creditsRes = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            },
          }
        );

        setMovie(movieRes.data);
        setCredits(creditsRes.data.cast);
      } catch (error) {
        console.error("불러오기 실패", error);
      }
    };

    fetchData();
  }, [movieId]);

  if (!movie) return <div className="p-6 text-white">로딩 중...</div>;

  return (
    <div className="text-white">
      {/* 배경 이미지 */}
      <div
        className="relative h-[550px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* 카드 스타일 정보 박스 */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:flex items-end gap-6">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-lg w-40 md:w-48"
          />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
            <div className="mt-2 flex gap-3 text-sm text-gray-300">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>{movie.release_date.slice(0, 4)}년</span>
              <span>{movie.runtime}분</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-white">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/10 px-2 py-1 rounded-full border border-white/20"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <p className="mt-4 text-gray-200 text-sm leading-relaxed max-w-2xl">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      {/* 출연진 */}
      <div className="p-6 bg-black">
        <h2 className="text-2xl font-bold mb-4">감독/출연</h2>
        <div className="flex overflow-x-auto gap-4 pb-2">
          {credits.slice(0, 15).map((person) => (
            <div
              key={person.id}
              className="flex-shrink-0 w-24 text-center hover:scale-105 transition"
            >
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                    : "https://via.placeholder.com/150x225?text=No+Image"
                }
                alt={person.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-2 shadow-md"
              />
              <p className="text-sm font-semibold truncate">{person.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {person.character}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
