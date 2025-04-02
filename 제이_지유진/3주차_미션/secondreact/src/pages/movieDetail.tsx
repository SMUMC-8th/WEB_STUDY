import { useParams } from "react-router-dom";
import useFetchMovieDetail from "../hooks/useFetchDetail";

function MovieDetail() {
  const { id } = useParams();
  const { detail, isPending, isError } = useFetchMovieDetail(id);

  if (isError) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-red-500 text-2xl whitespace-pre-line">
          에러가 발생했습니다. <br />
          다시 시도해주세요.
        </span>
      </div>
    );
  }

  if (isPending || !detail) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-white text-2xl">로딩 중...</span>
      </div>
    );
  }

  const date = detail.release_date.split("-")[0];
  const posterUrl = `https://image.tmdb.org/t/p/w500${detail.poster_path}`;

  return (
    <div
      className="m-5 p-4 bg-cover bg-center text-white rounded-2xl overflow-x-scroll"
      style={{
        backgroundImage: `url(${posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <div
        className="absolute top-0 left-0 w-1/2 h-full"
        style={{
          background: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0))`,
          backdropFilter: "blur(10px)",
        }}
      ></div>
      <div className="relative z-10 p-6 text-left w-1/2">
        <h1 className="text-3xl font-bold">{detail.title}</h1>
        <p>평균: {detail.vote_average}</p>
        <p>{date}</p>
        <p>{detail.runtime}분</p>
        <p className="mt-2">{detail.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
