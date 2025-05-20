import { NavLink } from "react-router-dom";

const Navbar = () => {
  const baseClass = "px-4 py-2 transition-colors duration-200";
  const activeClass = "text-blue-500 font-semibold";
  const inactiveClass = "text-gray-700 hover:text-black";

  return (
    <div className="flex w-full h-[100px] gap-[15px] items-center px-6">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        홈
      </NavLink>
      <NavLink
        to="/popular"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        인기 영화
      </NavLink>
      <NavLink
        to="/now_playing"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        상영 중
      </NavLink>
      <NavLink
        to="/top_rated"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        평점 높은
      </NavLink>
      <NavLink
        to="/upcoming"
        className={({ isActive }) =>
          `${baseClass} ${isActive ? activeClass : inactiveClass}`
        }
      >
        개봉 예정
      </NavLink>
    </div>
  );
};

export default Navbar;
