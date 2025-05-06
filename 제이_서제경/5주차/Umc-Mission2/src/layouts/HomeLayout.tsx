// src/layouts/HomeLayout.tsx
// 공통 레이아웃을 담당하는 컴포넌트

// React Router의 Outlet: 자식 라우트를 렌더링해주는 컴포넌트
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar"; // 상단 네비게이션 바
import Footer from "../components/Footer";

// 홈 레이아웃 컴포넌트 (공통 레이아웃 틀)
const HomeLayout = () => {
  return (
    // 전체 화면 높이 사용 + 수직 정렬
    <div className="h-dvh flex flex-col">
      {/* 공통 네비게이션 바 */}
      <NavBar />

      {/* 각 페이지(자식 라우트)가 렌더링되는 영역 */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* 하단 영역 (현재 비어있음)*/}
      <Footer />
    </div>
  );
};

export default HomeLayout;
