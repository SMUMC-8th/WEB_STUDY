import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { AuthFormProvider } from "./context/SignupFormContext";
import NotFound from "./components/NotFound";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/signin",
        element: <SigninPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
]);

function App() {
  return (
    <main className="w-full h-screen flex flex-col justify-cetner items-center bg-black">
      <AuthFormProvider>
        <RouterProvider router={router} />
      </AuthFormProvider>
    </main>
  );
}

export default App;
