// 라우터, 인증 컨텍스트, 서버 상태 관리, 공통 레이아웃까지 전반적인 앱의 뼈대를 세우는 파일

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

// React Query의 클라이언트 및 Provider, 개발자 도구 import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 페이지 컴포넌트 import (라우팅 시 해당 컴포넌트가 렌더링됨)
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomeLayout from "./layouts/HomeLayout";
import Mypage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtextedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import LpDetailPage from "./pages/LpDetailPage";

// publicRouters : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/", // 루트 경로
    element: <HomeLayout />, // 공통 레이아웃
    errorElement: <NotFoundPage />, // 에러 발생 시 보여줄 페이지
    children: [
      // 중첩 라우팅
      { index: true, element: <HomePage /> }, // "/" 경로에 HomePage 렌더링
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
      { path: "lps/:lpId", element: <LpDetailPage /> },
    ],
  },
];

// protectedRouters: 인증이 필요한 라우트
const protectedRouters: RouteObject[] = [
  {
    path: "/", // 동일한 루트지만 레이아웃만 다름
    element: <ProtextedLayout />, // 인증된 사용자에게만 보여지는 레이아웃
    errorElement: <NotFoundPage />, // 에러 발생 시 대체 페이지
    children: [
      {
        path: "mypage", // "/mypage" 경로는 로그인한 사용자만 접근 가능
        element: <Mypage />,
      },
    ],
  },
];

// 위에서 정의한 public + protected 라우트들을 하나의 라우터로 생성
const router = createBrowserRouter([...publicRoutes, ...protectedRouters]);

// React Query 클라이언트 생성 (데이터 캐싱 및 서버 상태 관리)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

// 라우터를 앱 전체에 적용
function App() {
  return (
    <div className="bg-black">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />{" "}
          {/* React Query 개발 도구 (닫힌 상태로 시작) */}
        </AuthProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
