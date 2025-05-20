import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isLogin } = useAuth();

  if (!isLogin) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
