import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import type { MovieDetail, Credits } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjM5YjY5YjY5YjY5YjY5YjY5YjY5YiIsInN1YiI6IjY1ZjY5YjY5YjY5YjY5YjY5YjY5YjY5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.6Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          axios.get(`${BASE_URL}/movie/${id}`, {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
            },
            params: {
              language: "ko-KR",
            },
          }),
          axios.get(`${BASE_URL}/movie/${id}/credits`, {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              "Content-Type": "application/json",
            },
            params: {
              language: "ko-KR",
            },
          }),
        ]);

        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError("영화 정보를 불러오는데 실패했습니다.");
        console.error("Error fetching movie details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">로딩 중...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="error-container">
        <p className="error-message">
          {error || "영화 정보를 찾을 수 없습니다."}
        </p>
        <button className="retry-button" onClick={() => navigate(-1)}>
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="movie-detail">
      <div className="movie-content">
        <div className="movie-detail-poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <div className="movie-info">
          <h1>{movie.title}</h1>
          {movie.tagline && <p className="tagline">{movie.tagline}</p>}
          <div className="movie-meta">
            <span>⭐ {movie.vote_average.toFixed(1)}</span>
            <span>🕒 {movie.runtime}분</span>
            <span>📅 {movie.release_date}</span>
          </div>
          <div className="genres">
            {movie.genres.map((genre: { id: number; name: string }) => (
              <span key={genre.id} className="genre">
                {genre.name}
              </span>
            ))}
          </div>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>

      {credits && (
        <div className="credits-section">
          <h2>감독 / 출연진</h2>
          <div className="credits-grid">
            {credits.crew
              .filter((person: { job: string }) => person.job === "Director")
              .map(
                (director: {
                  id: number;
                  name: string;
                  job: string;
                  profile_path: string | null;
                }) => (
                  <div key={director.id} className="credit-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                      alt={director.name}
                      className="credit-image"
                    />
                    <div className="credit-info">
                      <h3>{director.name}</h3>
                      <p>감독</p>
                    </div>
                  </div>
                )
              )}
            {credits.cast
              .slice(0, 5)
              .map(
                (actor: {
                  id: number;
                  name: string;
                  character: string;
                  profile_path: string | null;
                }) => (
                  <div key={actor.id} className="credit-item">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className="credit-image"
                    />
                    <div className="credit-info">
                      <h3>{actor.name}</h3>
                      <p>{actor.character}</p>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
