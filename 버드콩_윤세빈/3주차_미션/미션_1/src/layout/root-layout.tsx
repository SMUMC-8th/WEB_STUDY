import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/Navbar";
import NavBar2 from "../components/Navbar2";

const RootLayout = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/movie/"); 

  return (
    <>
      {isDetailPage ? <NavBar2 /> : <NavBar />}
      <Outlet />
    </>
  );
};

export default RootLayout;