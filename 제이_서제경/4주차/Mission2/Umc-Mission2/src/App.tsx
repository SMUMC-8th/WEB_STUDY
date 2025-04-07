// React Router에서 브라우저 기반 라우팅을 만들기 위한 함수와 컴포넌트를 import
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// 각 경로에서 보여줄 페이지 컴포넌트 import
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomeLayout from "./layouts/HomeLatout";
import Mypage from "./pages/MyPage";

// 라우터 정의: 경로(path)와 해당 경로에서 보여줄 컴포넌트를 연결
const router = createBrowserRouter([
  {
    path: "/", // 루트 경로 (예: http://localhost:5173/)
    element: <HomeLayout />, // 루트 경로에서 보여줄 기본 layout
    errorElement: <NotFoundPage />, // 잘못된 경로 접근 시 보여줄 컴포넌트
    children: [
      // 이 아래는 "/" 경로 안에서의 서브 경로들
      { index: true, element: <HomePage /> }, // 기본 경로 ("/")에서 보여줄 컴포넌트
      { path: "login", element: <LoginPage /> }, // "/login"에서 LoginPage 보여줌
      { path: "signup", element: <SignupPage /> }, // "/signup"에서 SignupPage 보여줌
      { path: "mypage", element: <Mypage /> }, // "/mypage"에서 Mypage 보여줌
    ],
  },
]);

// 라우터를 앱 전체에 적용
function App() {
  // 위에서 정의한 router를 실제 앱에 적용시켜주는 역할
  return <RouterProvider router={router} />;
}

export default App; // App 컴포넌트를 외부에서 사용할 수 있도록 export
