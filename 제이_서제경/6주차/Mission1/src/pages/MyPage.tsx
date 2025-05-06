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
    queryFn: getMyInfo, // 실제 서버에서 데이터를 가져오는 함수
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

  return (
    <div>
      <h1>{data?.data?.name}님 환영합니다.</h1> {/* 사용자 이름 표시 */}
      <img src={data?.data?.avatar as string} alt={"구글 로고"} />{" "}
      {/* 사용자 프로필 이미지 */}
      {/* 로그아웃 버튼 */}
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
