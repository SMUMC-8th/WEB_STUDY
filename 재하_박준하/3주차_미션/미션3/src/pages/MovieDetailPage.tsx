import MovieDetailTop from "../components/MovieDetailTop";
import MovieDetailBtm from "../components/MovieDetailBtm";
import useMovieDetailData from "../hooks/useMovieDetailData";
import { MovieCredits, MovieDetail } from "../types/movie";
import ErrorPage from "./ErrorPage";
import Loading from "../components/Loading";
import { curLanguageType } from "../types/movieState";

interface MovieDetailData {
  movie: MovieDetail | MovieCredits | null;
  error: number | null;
  isLoading: boolean;
}

export default function MovieDetailPage() {
  // aliasing을 통해 타입 해결~
  const {
    movie: topInfo,
    error: topError,
    isLoading: topIsLoading,
  }: MovieDetailData = useMovieDetailData<MovieDetail>({
    endURL: "",
    paramsApiUrl: [`language=${curLanguageType}`],
  });
  const {
    movie: btmInfo,
    error: btmError,
    isLoading: btmIsLoading,
  }: MovieDetailData = useMovieDetailData<MovieCredits>({
    endURL: "/credits",
    paramsApiUrl: [`language=${curLanguageType}`],
  });

  if (topError || btmError) {
    if (topError) return <ErrorPage value={topError} />;
    else return <ErrorPage value={btmError} />;
  }

  if (topIsLoading || btmIsLoading) {
    return <Loading />;
  }

  if (!topInfo || !btmInfo) return <ErrorPage value={500} />;

  return (
    <main className="w-full flex-grow-1 flex flex-col">
      <MovieDetailTop movie={topInfo} />
      <h1 className="pl-8 pb-6 text-left text-3xl">출연</h1>
      <MovieDetailBtm movie={btmInfo} />
    </main>
  );
}
