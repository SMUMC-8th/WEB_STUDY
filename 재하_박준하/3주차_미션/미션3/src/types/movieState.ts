import { MovieCredits, MovieDetail } from "./movie";

export interface IMovieDetail {
  movie: MovieDetail | null;
  error: number | null | undefined;
}

export interface IMovieCredit {
  movie: MovieCredits | null;
  error: number | null | undefined;
}

enum LanguageType {
  EN = "en-US",
}

export const curLanguageType = LanguageType.EN;
