import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import NotFoundPage from "./pages/NotFoundPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthProviderLogic";
import { RouteObject } from "react-router-dom";
import ProtectedLayout from "./layouts/ProtectedLayout";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


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
      {
        path: "v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: "/my-page",
    element: <ProtectedLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, // 또는 path: ""
        element: <MyPage />, 
      },
    ],
  },
];


const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
export const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export default App;