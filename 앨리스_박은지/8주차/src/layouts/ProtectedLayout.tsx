import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.tsx";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to={"/login"} replace />;
  }
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 mt-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
