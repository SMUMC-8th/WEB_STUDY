import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }
   return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default ProtectedLayout;