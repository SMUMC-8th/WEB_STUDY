import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`}>
          홈
        </Link>
        <Link
          to="/movies/popular"
          className={`nav-link ${isActive("/movies/popular") ? "active" : ""}`}
        >
          인기
        </Link>
        <Link
          to="/movies/now_playing"
          className={`nav-link ${
            isActive("/movies/now_playing") ? "active" : ""
          }`}
        >
          상영 중
        </Link>
        <Link
          to="/movies/top_rated"
          className={`nav-link ${
            isActive("/movies/top_rated") ? "active" : ""
          }`}
        >
          평점 높은
        </Link>
        <Link
          to="/movies/upcoming"
          className={`nav-link ${isActive("/movies/upcoming") ? "active" : ""}`}
        >
          개봉 예정
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
