import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { MovieResponse } from "../types/movie";
import { Istate } from "../types/movieState";
import Loading from "../components/Loading";
import ErrorPage from "./ErrorPage";
import { useNavigate } from "react-router-dom";

export default function Popular() {
  const [state, setState] = useState<Istate>({
    movies: [],
    page: 1,
    error: null,
  });
  const navigate = useNavigate();

  // api 호출 function
  async function getMovieAPI() {
    try {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${state.page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
            accept: "application/json",
          },
        }
      );

      setState((prevState) => ({
        ...prevState,
        movies: data.results,
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
  }, [state.page]);

  function moveMovieDetail(movieID: number) {
    navigate(`/movies/${movieID}`);
  }

  if (state.error) {
    return <ErrorPage value={state.error} />;
  }

  return (
    <>
      {Array.isArray(state.movies) && state.movies.length > 0 ? (
        // 버튼과 페이지 수 출력 부분
        <section className="w-full flex-grow-1 flex flex-col">
          <div className="m-6 flex flex-row justify-center items-center">
            <button
              onClick={() => setState({ ...state, page: state.page - 1 })}
              className={`w-[70px] h-[50px] rounded-xl mr-5 text-white text-xl ${
                state.page === 1
                  ? "bg-gray-500"
                  : "bg-pink-300 hover:bg-green-300"
              }`}
              disabled={state.page === 1 ? true : false} // page값이 1이라면 button 비활성화
            >
              {"<"}
            </button>
            <p className="text-lg">{`${state.page} 페이지`}</p>
            <button
              onClick={() => setState({ ...state, page: state.page + 1 })}
              className="w-[70px] h-[50px] rounded-xl ml-5 bg-pink-300 hover:bg-green-300 text-white text-xl"
            >
              {">"}
            </button>
          </div>
          <main className="box-border w-full grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {state.movies.map((movie) => {
              // 영화 grid 표현 부분
              return (
                <div key={movie.id} className="relative group rounded-2xl">
                  {movie.poster_path ? (
                    <img
                      className="box-border p-2 rounded-2xl group-hover:blur-sm"
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    ></img>
                  ) : (
                    <img
                      className="box-border p-2 rounded-2xl w-full h-full object-cover group-hover:blur-sm"
                      src="/src/assets/images/default-image.avif"
                    ></img>
                  )}{" "}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
                        flex flex-col justify-center items-center p-6"
                    onClick={() => moveMovieDetail(movie.id)}
                  >
                    <h3 className="mb-2 text-white text-lg text-center overflow-hidden">
                      {movie.title}
                    </h3>
                    <p className="line-clamp-3 text-white text-center">
                      {movie.overview}
                    </p>
                  </div>
                </div>
              );
            })}
          </main>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
