import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import Sidebar from "../components/\bSidebar";

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-dvh flex flex-col bg-black text-white">
      <NavBar setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-1 relative">
        {/* 사이드바 */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* 본문 */}
        <main
          className={`transition-all duration-300 flex-1 px-4 pt-4 ${
            sidebarOpen ? "pl-64" : ""
          }`}
        >
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default HomeLayout;
