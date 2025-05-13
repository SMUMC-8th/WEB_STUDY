import { Link, useLocation, Outlet } from "react-router-dom";
import React from "react";

const Layout = () => {
  const location = useLocation();

  const links = [
    { path: "/", label: "홈" },
    { path: "/movies/popular", label: "인기" },
    { path: "/movies/now_playing", label: "상영 중" },
    { path: "/movies/top_rated", label: "평점 높은" },
    { path: "/movies/upcoming", label: "개봉 예정" },
  ];

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-container">
          {links.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`nav-link ${
                location.pathname === path ? "active" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
