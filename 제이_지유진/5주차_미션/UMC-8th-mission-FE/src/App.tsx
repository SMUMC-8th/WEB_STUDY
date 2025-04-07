import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import HomePage from "./pages/Homepage";
import HomeLayout from "./layouts/HomeLayout";
import NotFound from "./pages/NotFoundPage";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { RouteObject } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { children } from "react";
import ProtectedLayout from "./layouts/ProtectedLayout";
//1. 홈페이지
//2. 로그인
//3. 회원가입

//public route : 인증 없이 가능한 라우트
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      {
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
  {
    path: "/v1/auth/google/callback",
    element: <GoogleLoginRedirectPage />,
  },
];
//protectroute: 인증이 필요한 라우트
const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "my",
        element: <Mypage />,
      },
    ],
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
