import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const HomeLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;