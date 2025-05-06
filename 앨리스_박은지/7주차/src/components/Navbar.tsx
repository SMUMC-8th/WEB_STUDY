import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { CiMenuBurger } from "react-icons/ci";
import Alert from "./alert/alert";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      if (!accessToken) {
        setData(null);
        return;
      }
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setData(null);
      }
    };
    getData();
  }, [accessToken]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setModalOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {modalOpen && <Alert onClose={handleCloseModal}></Alert>}
            <CiMenuBurger
              size={20}
              color="white"
              className="hover:cursor-pointer"
              onClick={() => setModalOpen(!modalOpen)}
            />
            <Link to="/" className="ml-4 flex items-center">
              <span className="text-xl font-bold text-pink-500">
                돌려돌려LP판
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {accessToken ? (
              <>
                <div className="text-gray-300 hover:text-white px-3 py-2 text-sm font-bold">
                  {data?.data?.name}님 환영합니다.
                </div>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-bold"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-bold"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md text-sm font-bold"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
