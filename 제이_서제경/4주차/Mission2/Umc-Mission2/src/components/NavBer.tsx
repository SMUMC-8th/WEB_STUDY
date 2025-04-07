import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="w-full bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold text-pink-400">
        둘려돌려LP판
      </Link>

      <div className="flex gap-4 text-sm">
        <Link to="/login" className="hover:text-pink-400 transition-colors">
          로그인
        </Link>
        <Link to="/signup" className="hover:text-pink-400 transition-colors">
          회원가입
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
