import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/main";
import MovieDetail from "./pages/movieDetail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <div className="layout">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movies/popular" element={<Main />} />
            <Route path="/movies/now_playing" element={<Main />} />
            <Route path="/movies/top_rated" element={<Main />} />
            <Route path="/movies/upcoming" element={<Main />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
