import { useParams } from "react-router-dom";
import { useCustomFetch } from "../hooks/useCustomFetch";
import Spinner from "../components/spinner";
import PersonCard from "../components/PersonCard";

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

  const {
    data: movie,
    loading: movieLoading,
    error: movieError,
  } = useCustomFetch<MovieDetailData>(
    `https://api.themoviedb.org/3/movie/${id}?language=ko`
  );

  const {
    data: credits,
    loading: creditLoading,
    error: creditError,
  } = useCustomFetch<CreditResponse>(
    `https://api.themoviedb.org/3/movie/${id}/credits`
  );

  if (movieLoading || creditLoading || !movie || !credits) return <Spinner />;
  if (movieError || creditError) return <p className="text-white">에러가 발생했습니다.</p>;

  const cast = credits.cast;
  const crew = credits.crew;

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
                <span key={genre.id} className="bg-rose-600 px-2 py-1 text-sm rounded-full">
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
          {[...crew.filter((p) => p.job === "Director"), ...cast.slice(0, 15)].map((person) => (
            <PersonCard
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


