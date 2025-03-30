import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { path: "/", label: "홈" },
    { path: "/movies/popular", label: "인기 영화" },
    { path: "/movies/nowPlaying", label: "상영 중" },
    { path: "/movies/top_rated", label: "평점 높은" },
    { path: "/movies/Upcoming", label: "개봉 예정" },
  ];

  return (
    <nav className="bg-black text-white py-4 pl-6 w-full">
      <ul className="flex space-x-6 text-center items-center">
        {navLinks.map((link) => (
          <li key={link.path}>
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                isActive ? "text-rose-600 font-bold" : "text-white"
              }
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
