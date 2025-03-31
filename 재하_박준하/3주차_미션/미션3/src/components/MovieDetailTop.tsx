import axios, { AxiosError } from "axios";
import { MovieDetail } from "../types/movie";
import { IMovieDetail } from "../types/movieState";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ErrorPage from "../pages/ErrorPage";
import { useParams } from "react-router-dom";

export default function MovieDetailTop() {
  const [state, setState] = useState<IMovieDetail>({
    movie: null,
    error: null,
  });
  const params = useParams();

  // api 호출 function
  async function getMovieAPI() {
    try {
      const { data } = await axios.get<MovieDetail>(
        `https://api.themoviedb.org/3/movie/${params.movieID}?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );
      setState((prevState) => ({
        ...prevState,
        movie: data,
      }));
    } catch (err: unknown) {
      // axiosError일 경우 처리
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        setState((prevState) => ({
          ...prevState,
          error: axiosError.response?.status,
        }));
      }
      // 현재는 그런 상황이 없지만 axios error가 아닌 경우
      else {
        setState((prevState) => ({
          ...prevState,
          error: 500,
        }));
      }
    }
  }

  useEffect(() => {
    getMovieAPI();
  }, []);

  if (state.error) {
    return <ErrorPage value={state.error} />;
  }

  return (
    <>
      {state.movie ? (
        <section className="relative box-border w-full h-[50vh] p-6 flex justify-center items-center">
          {state.movie.backdrop_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${state.movie.backdrop_path}`}
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-full rounded-2xl bg-gray-500"></div>
          )}
          <article className="absolute inset-0 w-[50%] sm:w-[30%] h-full p-6">
            <main className="box-border w-full h-full p-2 sm:p-5 rounded-2xl opacity-70 bg-black text-white">
              <h1 className="text-md sm:text-2xl break-words">{`${state.movie.title}`}</h1>
              <div className="truncate">
                <p className="text-sm sm:text-md pt-2">{`평점 ${state.movie.vote_average.toFixed(
                  1
                )}`}</p>
                <p className="text-sm sm:text-md">{`${state.movie.release_date.substring(
                  0,
                  4
                )}`}</p>
                <p className="text-sm sm:text-md">{`${state.movie.runtime}분`}</p>
              </div>
              <p className="pt-2 text-sm sm:text-md line-clamp-5">{`${state.movie.overview}`}</p>
            </main>
          </article>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
