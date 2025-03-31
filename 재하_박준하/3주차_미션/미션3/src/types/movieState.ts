import { Movie, MovieCredits, MovieDetail } from "./movie";

export interface Istate {
  movies: Movie[];
  page: number;
  error: number | null | undefined;
}

export interface IMovieDetail {
  movie: MovieDetail | null;
  error: number | null | undefined;
}

export interface IMovieCredit {
  movie: MovieCredits | null;
  error: number | null | undefined;
}
