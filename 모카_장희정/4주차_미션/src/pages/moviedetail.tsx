import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetail as MovieDetailType, Credits } from "../types/movie";
import Loading from "../components/Loading";
import Error from "../components/Error";

const MovieDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${
            import.meta.env.VITE_TMDB_TOKEN
          }&language=ko-KR&append_to_response=credits`
        );
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!data) return null;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}
      >
        {data.title}
      </h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
        alt={data.title}
        style={{ width: "300px", borderRadius: "10px", marginBottom: "20px" }}
      />
      <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
        {data.overview}
      </p>
    </div>
  );
};

export default MovieDetail;
