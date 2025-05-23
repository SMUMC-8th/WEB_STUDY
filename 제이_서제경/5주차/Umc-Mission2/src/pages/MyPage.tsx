import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import { ResponseMyInfoDto } from "../types/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStoage.ts";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>();

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      console.log(response);

      setData(response);
    };

    getData();
  }, []);

  const { removeItem: removeAccessToken } = useLocalStorage("accessToken");
  const { removeItem: removeRefreshToken } = useLocalStorage("refreshToken");

  const handleLogout = async () => {
    removeAccessToken();
    removeRefreshToken();
    await logout();
    navigate("/");
  };

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다.</h1>
      <img src={data?.data?.avatar as string} alt={"구글 로고"} />

      <button
        className="cursor-pointer bg-blue-300 rounded-sm p-5 hover:scale-90"
        onClick={handleLogout}
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
