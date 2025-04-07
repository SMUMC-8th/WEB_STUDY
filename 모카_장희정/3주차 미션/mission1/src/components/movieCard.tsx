export type TMovie = {
  adult: boolean;
  title: string;
  overview: string;
  vote_count: number;
  poster_path: string;
  id: number;
};

const MovieCard = (movie: TMovie) => {
  return (
    <div style={styles.card}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        style={styles.image}
      />
      <div style={styles.title}>{movie.title}</div>
      <div style={styles.overview}>{movie.overview}</div>
      <div style={styles.vote}>⭐ {movie.vote_count}</div>
    </div>
  );
};

// 카드 크기는 부모의 `grid` 설정에 따라 자동 조정
const styles = {
  card: {
    width: "100%",
    maxWidth: "300px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    padding: "10px",
    backgroundColor: "#fff",
    textAlign: "center" as const,
    margin: "auto",
  },
  image: {
    width: "100%",
    height: "400px",
    borderRadius: "10px",
    objectFit: "cover" as const,
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  overview: {
    fontSize: "14px",
    color: "#555",
    maxHeight: "60px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical" as const,
    WebkitLineClamp: 3, //  3줄 이상 줄임
  },
  vote: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#f39c12",
    marginTop: "5px",
  },
};

export default MovieCard;
