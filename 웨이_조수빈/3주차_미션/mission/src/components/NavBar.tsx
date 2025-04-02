// NavBar.tsx 
import { NavLink } from "react-router-dom";

export default function NavBar() {
  const navLinks = [
    { path : "/", label: "HOME" },
    { path: "/movies/popular", label: "POPULAR" },
    { path: "/movies/now_playing", label: "NOW" },
    { path: "/movies/top_rated", label: "TOP" },
    { path: "/movies/upcoming", label: "UPCOMING" },
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

        {/* 오른쪽 끝에 배치 */}
        <li className="ml-auto text-rose-400 pr-6 select-none cursor-default">sooloin</li>
      </ul>

    </nav>
  );
}
