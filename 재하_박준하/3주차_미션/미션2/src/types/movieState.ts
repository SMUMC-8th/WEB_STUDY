import { Movie } from "./movie";

export interface Istate {
  movies: Movie[];
  page: number;
  error: number | null | undefined;
}
