import axios, { AxiosError } from "axios";
import { MovieCredits } from "../types/movie";
import { IMovieCredit } from "../types/movieState";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import ErrorPage from "../pages/ErrorPage";
import { useParams } from "react-router-dom";

export default function MovieDetailBtm() {
  const [state, setState] = useState<IMovieCredit>({
    movie: null,
    error: null,
  });
  const params = useParams();

  // api 호출 function
  async function getMovieAPI() {
    try {
      const { data } = await axios.get<MovieCredits>(
        `https://api.themoviedb.org/3/movie/${params.movieID}/credits?language=en-US`,
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

  console.log(state.movie);

  return (
    <>
      {state.movie ? (
        <section className="box-border px-6 py-8 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-6">
          {state.movie.cast.map((human) => {
            return (
              <div
                key={human.id}
                className="box-border flex flex-col justify-center items-center text-center"
              >
                <div className="w-full aspect-square overflow-hidden rounded-full mb-2">
                  {human.profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${human.profile_path}`}
                      className="w-full h-full object-cover"
                      alt={human.name}
                    />
                  ) : (
                    <img
                      src="/src/assets/images/default-image.avif"
                      className="w-full h-full object-cover"
                      alt="No profile"
                    />
                  )}
                </div>
                <p className="font-medium text-sm mt-1 truncate w-full">
                  {human.name}
                </p>
                <p className="text-xs text-gray-500 truncate w-full">
                  {human.character}
                </p>
              </div>
            );
          })}
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
