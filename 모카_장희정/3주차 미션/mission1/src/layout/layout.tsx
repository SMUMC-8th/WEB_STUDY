import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const Layout = () => {
  return (
    <div className="flex-col flex w-full h-100vh">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
