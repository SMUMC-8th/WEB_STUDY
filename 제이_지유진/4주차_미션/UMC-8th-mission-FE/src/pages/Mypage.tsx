import { useState, useEffect } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { ResponseMyInfoDto } from "../types/auth.ts";
import { useAuth } from "../../context/AuthContext.tsx";
export default function Mypage() {
  const [data, setData] = useState<ResponseMyInfoDto>([]);
  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();
      console.log(response);

      setData(response);
    };
    getData();
  }, []);
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/login"; //로그아웃하면 로그인 페이지로 이동
  };
  return (
    <div className="text-white flex flex-col items-center justify-center gap-4">
      <h1>{data.data?.name}님 환영합니다.</h1>
      <img
        src={
          (data.data?.avatar as string) ||
          "https://www.studiopeople.kr/common/img/default_profile.png"
        }
        alt={"구글 로고"}
        className="rounded-full w-50 h-50"
      />
      <h1>{data.data?.email}</h1>

      <button
        className="cursor-pointer bg-pink-500 rounded-sm p-2 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
}
