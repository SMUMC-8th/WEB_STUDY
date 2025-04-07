// 영화 상세 정보 페이지

import { useParams } from "react-router-dom";
import { MovieDetailResponse, Credit } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";
import defaultProfile from "../assets/default-profile.jpeg";

export default function MovieDetailPage() {
  // 1. URL에서 movieId를 가져오기
  const { movieId } = useParams<{ movieId: string }>();

  // 2. 영화 정보 요청용 URL
  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;

  // 출연진(감독/배우) 정보 요청용 URL
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;

  // 3. 영화 정보 가져오기
  const {
    data: movie, // 영화 정보 데이터
    isPending: moviePending, // 로딩 중 여부
    isError: movieError, // 에러 발생 여부
  } = useCustomFetch<MovieDetailResponse>(movieUrl);

  // 4. 출연진 정보 가져오기
  const {
    data: creditsData,
    isPending: creditsPending,
    isError: creditsError,
  } = useCustomFetch<{ cast: Credit[] }>(creditsUrl);

  // 5. 공통 로딩/에러 상태 관리 : 둘 중 하나라도 에러, 로딩이면 전체 처리
  const isPending = moviePending || creditsPending;
  const isError = movieError || creditsError;

  // 6. 에러 시 화면
  if (isError) {
    return (
      <div className="text-red-500 text-2xl text-center mt-10">
        에러가 발생했습니다.
      </div>
    );
  }

  // 7. 로딩 중 화면 : 로딩 스피너 보여줌
  if (isPending || !movie || !creditsData) {
    return (
      <div className="flex items-center justify-center h-dvh backdrop-blur-sm bg-white/70 rounded-full p-3">
        <LoadingSpinner />
      </div>
    );
  }

  // 8. 출연진 정보를 분리
  const credits = creditsData.cast;

  return (
    <div className="text-white">
      {/* 배경 이미지 : 포스터 출력 */}
      <div
        className="relative h-[550px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* 카드 스타일 정보 박스 */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:flex items-end gap-6">
          {/* 🎞 영화 포스터 */}
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-lg w-40 md:w-48"
          />
          {/* 🎫 영화 텍스트 정보 */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
            <div className="mt-2 flex gap-3 text-sm text-gray-300">
              <span>⭐ {movie.vote_average.toFixed(1)}</span>
              <span>{movie.release_date.slice(0, 4)}년</span>
              <span>{movie.runtime}분</span>
            </div>
            {/* 🎯 장르 정보 */}
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
            {/* 줄거리 */}
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
              {/* 🧑‍🎤 프로필 이미지 */}
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w185${person.profile_path}` // 프로필 이미지 있을 때
                    : defaultProfile // 프로필 이미지 없으면 기본 이미지로 대체
                }
                alt={person.name}
                className="w-24 h-24 rounded-full object-cover mx-auto mb-2 shadow-md"
              />
              {/* 🧾 배우 이름 */}
              <p className="text-sm font-semibold truncate">{person.name}</p>
              {/* 🎭 맡은 역할 */}
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
