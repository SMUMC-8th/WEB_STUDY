// 로그인한 사용자만 접근할 수 있는 라우트 보호(인증 처리)하는 파일

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  // 로그인 여부 판단을 위한 accessToken
  const { accessToken } = useAuth();

  // accessToken이 없으면 로그인 안 한 상태 → 로그인 페이지로 리다이렉트
  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }

  // accessToken이 있다면 자식 페이지(중첩 라우트)를 그대로 보여줌
  return <Outlet />;
};

export default ProtectedLayout;
