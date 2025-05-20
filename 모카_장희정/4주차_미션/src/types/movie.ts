export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  runtime: number;
  budget: number;
  revenue: number;
  tagline: string;
  status: string;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
}

export interface Credits {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    credit_id: string;
  }[];
  crew: Crew[];
}

export interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
  credit_id: string;
}

// types/movie.ts
export type TMovie = {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
};

// types/movie.ts
export type TMovieResponse = {
  page: number;
  results: {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
  }[];
  total_pages: number;
  total_results: number;
};
