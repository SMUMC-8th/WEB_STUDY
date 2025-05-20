import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage";
import { RouteObject } from "react-router-dom";
import { AuthProvider } from "./context/AuthProviderLogic";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

// 1. 홈페이지
// 2. 로그인 페이지
// 3. 회원가입 페이지

//publicRoutes : 인증 없이 접근 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "v1/auth/google/callback", element: <GoogleLoginRedirectPage/>},
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/mypage",
    element:
      <ProtectedLayout>
        <MyPage />
      </ProtectedLayout>,
    errorElement: <NotFoundPage />,
  },
];


const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;