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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LpListPage from "./pages/LpListPage";
import LpDetailPage from "./pages/LpDetailPage";

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
          {
            path: "/lplist",
            element: <LpListPage />,
          },
          {
            path: "/lplist/:LPid",
            element: <LpDetailPage />,
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

export const queryClient = new QueryClient();

function App() {
  return (
    <main className="w-full h-screen flex flex-col justify-cetner items-center bg-black">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </main>
  );
}

export default App;
