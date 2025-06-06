import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.tsx";

const Layout = (): ReactElement => {
  return (
    <div className="layout">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
