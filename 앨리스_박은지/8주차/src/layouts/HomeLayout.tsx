import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer.tsx";

const HomeLayout = () => {
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

export default HomeLayout;
