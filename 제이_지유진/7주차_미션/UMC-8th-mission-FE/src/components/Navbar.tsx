import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useQuery } from "@tanstack/react-query";
import Alert from "./alert/alert.tsx";
import HamburgerButton from "../components/Hamburger.tsx";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const { logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ["myInfo"],
    queryFn: () => getMyInfo(),
  });

  useEffect(() => {
    if (isSuccess) {
      setIsLoggedIn(true);
      setUserName(data.data.name);
    } else {
      setIsLoggedIn(false);
    }
  }, [data, isSuccess]);

  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("login");
  };
  const handleSignupClick = () => {
    navigate("signup");
  };
  const handleLogoClick = () => {
    navigate("/");
  };
  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-full bg-zinc-800 h-[60px] min-h-[80px] flex items-center pl-5 pr-5 z-[1000] box-border">
      {modalOpen && <Alert onClose={handleCloseModal} />}
      <HamburgerButton onToggle={handleToggleModal} isOpen={modalOpen} />
      <p
        className="text-pink-600 font-bold text-2xl cursor-pointer ml-3"
        onClick={handleLogoClick}
      >
        돌려돌려LP판
      </p>
      <div className="ml-auto">
        {" "}
        {!isLoggedIn && (
          <div className="flex gap-3 items-center">
            <button
              className="rounded-[5px] text-gray-200 text-sm bg-gray-900 h-10 w-[80px] cursor-pointer p-[8px] hover:bg-gray-700 transition box-border"
              onClick={handleLoginClick}
            >
              로그인
            </button>
            <button
              className="rounded-[5px] text-gray-200 text-sm bg-pink-600 h-10 w-[80px] cursor-pointer p-[8px] hover:bg-pink-500 transition box-border"
              onClick={handleSignupClick}
            >
              회원가입
            </button>
          </div>
        )}
        {isLoggedIn && (
          <div className="flex gap-3 items-center text-gray-200 justify-center">
            <p className="text-sm font-bold">안녕하세요, {userName}님</p>
            <button
              className="rounded-[5px] text-gray-200 text-sm bg-pink-600 h-10 w-[80px] cursor-pointer p-[8px] hover:bg-pink-500 transition box-border"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
