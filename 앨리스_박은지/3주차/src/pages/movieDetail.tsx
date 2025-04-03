import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import type { MovieDetails, MovieCredits } from "../types/movie";
import profileImage from "../assets/Profile.png";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchMovieDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const headers = {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        accept: "application/json",
      };

      const [movieResponse, creditsResponse] = await Promise.all([
        axios.get<MovieDetails>(
          `${import.meta.env.VITE_TMDB_BASE_URL}/movie/${id}?language=ko-KR`,
          { headers }
        ),
        axios.get<MovieCredits>(
          `${
            import.meta.env.VITE_TMDB_BASE_URL
          }/movie/${id}/credits?language=ko-KR`,
          { headers }
        ),
      ]);

      if (!movieResponse.data) {
        throw new Error("API 응답이 비어있습니다.");
      }

      if (!creditsResponse.data) {
        throw new Error("출연진 정보를 불러오는데 실패했습니다.");
      }

      setMovie(movieResponse.data);
      setCredits(creditsResponse.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("영화 정보를 불러오는데 실패했습니다.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  return (
    <div className="movie-detail">
      {isLoading ? (
        <div className="loading-content">
          <LoadingSpinner />
        </div>
      ) : error ? (
        <div className="error-container">
          <p className="error-message">{error.message}</p>
          <button className="retry-button" onClick={fetchMovieDetails}>
            다시 시도
          </button>
        </div>
      ) : !movie || !credits ? (
        <div>영화 정보를 찾을 수 없습니다.</div>
      ) : (
        <>
          <div className="movie-content">
            <div className="movie-detail-poster">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : profileImage
                }
                alt={movie.title}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = profileImage;
                }}
              />
            </div>
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <p className="tagline">{movie.tagline}</p>
              <div className="movie-meta">
                <span>개봉: {movie.release_date.split("-")[0]}</span>
                <span>상영시간: {movie.runtime}분</span>
                <span>평점: ⭐ {movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre">
                    {genre.name}
                  </span>
                ))}
              </div>
              <p className="overview">{movie.overview}</p>
            </div>
          </div>

          <div className="credits-section">
            <h2>감독 / 출연진</h2>
            <div className="credits-grid">
              {credits.crew
                .filter((person) => person.job === "Director")
                .map((director) => (
                  <div key={director.id} className="credit-item">
                    <img
                      src={
                        director.profile_path
                          ? `https://image.tmdb.org/t/p/w200${director.profile_path}`
                          : profileImage
                      }
                      alt={director.name}
                      className="credit-image"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = profileImage;
                      }}
                    />
                    <div className="credit-info">
                      <h3>{director.name}</h3>
                      <p>감독</p>
                    </div>
                  </div>
                ))}
              {credits.cast.slice(0, 10).map((actor) => (
                <div key={actor.id} className="credit-item">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : profileImage
                    }
                    alt={actor.name}
                    className="credit-image"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = profileImage;
                    }}
                  />
                  <div className="credit-info">
                    <h3>{actor.name}</h3>
                    <p>{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
