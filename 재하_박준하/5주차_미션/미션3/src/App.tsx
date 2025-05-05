import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { AuthFormProvider } from "./context/SignupFormContext";
import NotFound from "./components/NotFound";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import GoogleLoginRedirectPage from "./pages/GoogleLoginRedirectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/signin",
        element: (
          <AuthFormProvider>
            <SigninPage />
          </AuthFormProvider>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthFormProvider>
            <SignupPage />,
          </AuthFormProvider>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/mypage",
            element: <MyPage />,
          },
        ],
      },
      {
        path: "/v1/auth/google/callback",
        element: <GoogleLoginRedirectPage />,
      },
    ],
  },
]);

function App() {
  return (
    <main className="w-full h-screen flex flex-col justify-cetner items-center bg-black">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </main>
  );
}

export default App;
