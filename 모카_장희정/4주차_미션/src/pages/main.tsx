// main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import { MovieType } from "../hooks/useCustomFetch";
import MovieList from "../components/MovieList";

// Main 컴포넌트 정의
const Main = () => {
  const location = useLocation();

  const getMovieType = (): MovieType => {
    const pathToTypeMap: Record<string, MovieType> = {
      "/": "now_playing",
      "/movies/now_playing": "now_playing",
      "/movies/popular": "popular",
      "/movies/top_rated": "top_rated",
      "/movies/upcoming": "upcoming",
    };
    return pathToTypeMap[location.pathname] || "popular";
  };

  return <MovieList type={getMovieType()} />;
};
export default Main;

const App = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
