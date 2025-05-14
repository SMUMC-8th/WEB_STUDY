import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import PlusButton from "../components/PlusButton";
export default function HomeLayout() {
  return (
    <div className="h-dvh flex flex-col bg-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PlusButton />
    </div>
  );
}
