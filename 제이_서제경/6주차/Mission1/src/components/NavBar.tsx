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
      <nav className="w-full fixed top-0 left-0 z-50 bg-black/70 backdrop-blur-md text-white px-6 shadow-sm">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-[60px]">
          {/* 왼쪽: 햄버거 + 로고 */}
          <div className="flex items-center gap-x-4 h-full">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-xl hover:text-gray-300 transition-colors duration-200 leading-none align-middle"
            >
              ☰
            </button>
            <Link
              to="/"
              className="font-semibold text-lg tracking-tight hover:text-gray-400 transition-colors leading-none align-middle"
            >
              UMCLP
            </Link>
          </div>

          {/* 오른쪽 */}
          <div className="flex items-center gap-x-6 text-sm font-medium h-full">
            <button className="text-white hover:text-gray-300 transition-colors leading-none align-middle">
              <span className="material-icons text-lg align-middle">
                search
              </span>
            </button>

            {accessToken ? (
              <div className="flex items-center gap-4">
                <span className="text-gray-200 align-middle leading-none">
                  {user?.name}님 반갑습니다
                </span>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-400 transition-colors duration-200 align-middle leading-none"
                >
                  로그아웃
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="hover:text-gray-400 transition-colors duration-200 align-middle leading-none"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="hover:text-gray-400 transition-colors duration-200 align-middle leading-none"
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
