import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Side from "../components/Side";
import { useState, useEffect } from "react";

export default function RootLayout() {
  const { isLogin } = useAuth();
  const [isSideVisible, setIsSideVisible] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsSideVisible(e.matches);
    };

    // 초기 상태 설정
    handleResize(mediaQuery);

    // 미디어 쿼리 변경 감지
    mediaQuery.addEventListener("change", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  if (!isLogin) {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <Header props={{ isSideVisible, setIsSideVisible }} />
        <main className="w-full h-[90vh] flex flex-row">
          {!isSideVisible ? <></> : <Side />}
          <Outlet />
        </main>
      </>
    );
  }
}
