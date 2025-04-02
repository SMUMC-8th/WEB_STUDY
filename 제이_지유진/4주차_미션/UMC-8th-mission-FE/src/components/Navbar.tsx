import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      if (response.statusCode === 200) {
        setIsLoggedIn(true);
        console.log(response.data.name);
        setUserName(response.data.name);
      } else {
        setIsLoggedIn(false);
      }
    };
    getData();
  }, []);
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
  return (
    <div className="w-full bg-zinc-800 h-[80px] flex justify-between items-center text-center pl-5 pr-5">
      <p
        className="text-pink-600 font-bold text-3xl cursor-pointer"
        onClick={handleLogoClick}
      >
        돌려돌려LP판
      </p>
      {!isLoggedIn && (
        <div className="flex gap-4">
          <button
            className="rounded-[5px] text-white text-m bg-gray-900 w-[70px] cursor-pointer p-[5px]"
            onClick={handleLoginClick}
          >
            로그인
          </button>
          <button
            className="rounded-[5px] text-white text-m bg-pink-600  w-[70px] cursor-pointer p-[5px]"
            onClick={handleSignupClick}
          >
            회원가입
          </button>
        </div>
      )}
      {isLoggedIn && (
        <div className="flex gap-4 text-white text-center jutify-center items-center">
          <p>안녕하세요, {userName}님</p>
          <button className="rounded-[5px] text-white text-m bg-pink-600  w-[70px] cursor-pointer p-[5px]">
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
