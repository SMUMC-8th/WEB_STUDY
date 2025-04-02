import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import HomePage from "./pages/Homepage";
import HomeLayout from "./layouts/HomeLayout";
import NotFound from "./pages/NotFoundPage";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/Mypage";
//1. 홈페이지
//2. 로그인
//3. 회원가입

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "my", element: <Mypage /> },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
