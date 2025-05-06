// React Router에서 브라우저 기반 라우팅을 만들기 위한 함수와 컴포넌트를 import
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";

// 각 경로에서 보여줄 페이지 컴포넌트 import
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomeLayout from "./layouts/HomeLayout";
import Mypage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtextedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

// publicRouters : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage /> },
    ],
  },
];

// protectedRouters: 인증이 필요한 라우트
const protectedRouters: RouteObject[] = [
  {
    path: "/",
    element: <ProtextedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "mypage",
        element: <Mypage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRouters]);

// 라우터를 앱 전체에 적용
function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
