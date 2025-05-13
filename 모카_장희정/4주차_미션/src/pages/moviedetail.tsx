import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import type { MovieDetail as MovieDetailType, Credits } from "../types/movie";
import Loading from "../components/Loading";
import Error from "../components/Error";
import profileImage from "../assets/Profile.png";

// ✅ 여기가 실제 컴포넌트 정의
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
    <div>
      <h1>{data.title}</h1>
      <p>{data.overview}</p>
    </div>
  );
};

export default MovieDetail; // ✅ 이제 이게 진짜 컴포넌트를 내보냄
