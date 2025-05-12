import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("유저 정보를 불러오는 데 실패했습니다.");
      }
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // ✅ 내부 data까지 안전하게 체크
  if (!data || !data.data) {
    return <div>로딩 중...</div>;
  }

  const { name, avatar, email } = data.data;

  return (
    <div>
      <h1>{name}님 환영합니다.</h1>
      <img src={avatar ?? ""} alt="프로필 이미지" />
      <h1>{email}</h1>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default MyPage;
