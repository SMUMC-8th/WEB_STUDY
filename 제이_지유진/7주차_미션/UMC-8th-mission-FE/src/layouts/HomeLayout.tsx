import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import PlusButton from "../components/PlusButton";
import { useState } from "react";
import WriteModal from "../components/alert/WriteModal";
export default function HomeLayout() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="h-dvh flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {isOpen && <WriteModal onClose={() => setIsOpen(false)}></WriteModal>}
      <PlusButton setIsOpen={setIsOpen} />
    </div>
  );
}
