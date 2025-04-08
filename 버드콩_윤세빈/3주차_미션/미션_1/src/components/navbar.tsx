import { NavLink } from "react-router-dom";

export default function NavBar() {
  const navLinks = [
    { path : "/", label: "홈" },
    { path: "/movies/popular", label: "인기영화" },
    { path: "/movies/now_playing", label: "상영 중" },
    { path: "/movies/top_rated", label: "평점 높은" },
    { path: "/movies/upcoming", label: "개봉 예정" },
  ];


  return (
    <nav className="w-full bg-black text-white text-lg text-center py-5 px-5 select-none">
      <ul className="flex space-x-6 items-center w-full font-semibold">
        {navLinks.map((link) => (
            <li key={link.path}>
            <NavLink
                to={link.path}
                className={({ isActive }) =>
                isActive ? "text-rose-400" : "text-white"
                }
            >
                {link.label}
            </NavLink>
            </li>
        ))}

        <li className="ml-auto text-rose-400 pr-6 select-none cursor-default">BEEN</li>
      </ul>

    </nav>
  );
}