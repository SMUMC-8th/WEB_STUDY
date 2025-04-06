import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/main";
import Movies from "./pages/movies";
import MovieDetail from "./pages/movieDetail";
import Layout from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="movies/:category" element={<Movies />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
