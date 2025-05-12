import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomeLayout from './layouts/HomeLayout';
import MyPage from './pages/MyPage';
import { AuthProvider } from './context/AuthContext';
import GoogleLoginRedirectePage from './pages/GoogleLoginRedirectePage';

// publicRoutes: 인증 없이 접근 가능한 라우터
const publicRoutes: RouteObject = {
  path: '/',
  element: <HomeLayout />,
  errorElement: <NotFoundPage />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "login", element: <LoginPage /> },
    { path: "signup", element: <SignupPage /> },
    { path: "v1/auth/google/callback", element: <GoogleLoginRedirectePage />},
  ],
};

// protectedRoutes: 인증이 필요한 라우터
const protectedRoutes: RouteObject = {
  path: '/',
  children: [
    {
      path: 'my',
      element: <MyPage />, // ✅ 오타 수정
    },
  ],
};

// ✅ 전체 라우터 병합
const router = createBrowserRouter([
  publicRoutes,
  protectedRoutes, // ✅ 포함시켜야 동작함
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
