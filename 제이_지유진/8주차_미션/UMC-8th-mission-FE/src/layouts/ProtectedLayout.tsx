import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
function ProtectedLayout() {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />; //replace는 히스토리에 남지 않음
  }
  return (
    <div className="h-dvh flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default ProtectedLayout;
