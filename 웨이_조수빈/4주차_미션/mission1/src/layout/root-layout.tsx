import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import DetailNavBar from "../components/DetailNavBar";

const RootLayout = () => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/movie/"); 

  return (
    <>
      {isDetailPage ? <DetailNavBar /> : <NavBar />}
      <Outlet />
    </>
  );
};

export default RootLayout;


