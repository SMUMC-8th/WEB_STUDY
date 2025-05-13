import { getMyInfo } from "../apis/auth.ts";
import { ResponseMyInfoDto } from "../types/auth.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStoage.ts";
import { useQuery } from "@tanstack/react-query";

const MyPage = () => {
  const navigate = useNavigate(); // 페이지 이동 함수
  const { logout } = useAuth(); // 로그아웃 처리 함수

  // 사용자 정보 가져오기: React Query로 getMyInfo API 호출
  const { data } = useQuery<ResponseMyInfoDto>({
    queryKey: ["myInfo"], // 캐싱 및 무효화 기준이 되는 키
    queryFn: () => getMyInfo(), // 실제 서버에서 데이터를 가져오는 함수
  });

  // accessToken, refreshToken을 삭제하는 커스텀 훅 호출
  const { removeItem: removeAccessToken } = useLocalStorage("accessToken");
  const { removeItem: removeRefreshToken } = useLocalStorage("refreshToken");

  // 로그아웃 핸들러: 토큰 제거 + AuthContext 로그아웃 처리 + 홈으로 이동
  const handleLogout = async () => {
    removeAccessToken();
    removeRefreshToken();
    await logout(); // 서버 또는 context 상태에서 로그아웃 처리
    navigate("/"); // 홈으로 이동
  };
  console.log(data);
  return (
    <div>
      {/* 프로필 / 이름 / 이메일 부분*/}
      <div></div>
      {/* 내가 좋아요한 LP / 내가 작성한 LP */}
      <div></div>
    </div>
  );
};

export default MyPage;
