import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import Sidebar from "../components/\bSidebar";
import WriteModal from "../constants/WriteModal";

const HomeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [addModalOpen, setAddModalOpen] = useState(false);

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

      {/* 게시물 추가 버튼 */}
      <div
        onClick={() => setAddModalOpen(true)}
        className="flex w-15 h-15 rounded-[50%] fixed bg-white/50 backdrop-blur-md
        text-black bottom-10 right-10 text-[20px] items-center justify-center"
      >
        +
      </div>
      {addModalOpen && <WriteModal onClose={() => setAddModalOpen(false)} />}

      <Footer />
    </div>
  );
};

export default HomeLayout;
