import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postLogout } from "../apis/auth";
import { useLocalStorage } from "../hooks/useLocalStoage";
import { Dispatch, SetStateAction } from "react";

// 🔧 props 타입 정의
type NavBarProps = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const NavBar = ({ setSidebarOpen }: NavBarProps) => {
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();

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
    <>
      <nav className="w-full bg-zinc-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
        {/* 왼쪽: 햄버거 + 로고 */}
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-2xl">
            ☰
          </button>
          <Link to="/" className="text-xl font-bold text-pink-400">
            둘려돌려LP판
          </Link>
        </div>

        {/* 오른쪽 */}
        <div className="flex items-center gap-4 text-sm">
          <button className="flex items-center text-white text-lg">
            <span className="material-icons">search</span>
          </button>

          {accessToken ? (
            <div className="flex items-center gap-4 text-sm">
              <span className="text-white">{user?.name}님 반갑습니다</span>
              <button
                onClick={handleLogout}
                className="hover:text-pink-400 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex gap-4 text-sm">
              <Link
                to="/login"
                className="hover:text-pink-400 transition-colors"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="hover:text-pink-400 transition-colors"
              >
                회원가입
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
