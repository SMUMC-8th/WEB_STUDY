import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import { SignupProvider } from "./context/SignupContext";
import NotFound from "./components/NotFound";

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
        element: (
          <SignupProvider>
            <SignupPage />
          </SignupProvider>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <main className="w-full h-screen flex flex-col justify-cetner items-center bg-black">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
