import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postLogout } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStoage";

const NavBar = () => {
  const navigate = useNavigate();

  const { accessToken } = useAuth();

  const { removeItem: removeAccessToken } = useLocalStorage("accessToken");
  const { removeItem: removeRefreshToken } = useLocalStorage("refreshToken");

  const handleLogout = async () => {
    try {
      await postLogout();
      removeAccessToken();
      removeRefreshToken();
      alert("로그아웃 되었습니다.");
      navigate("/login");
    } catch (error) {
      console.error("로그아웃 실패");
      alert("로그아웃 실패");
    }
  };

  return (
    <nav className="w-full bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <Link to="/" className="text-xl font-bold text-pink-400">
        둘려돌려LP판
      </Link>

      {accessToken ? (
        <div className="flex gap-4 text-sm">
          <div
            onClick={handleLogout}
            className="hover:text-pink-400 transition-colors"
          >
            로그아웃
          </div>
        </div>
      ) : (
        <div className="flex gap-4 text-sm">
          <Link to="/login" className="hover:text-pink-400 transition-colors">
            로그인
          </Link>
          <Link to="/signup" className="hover:text-pink-400 transition-colors">
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
