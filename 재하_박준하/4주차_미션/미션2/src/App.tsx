import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import SigninPage from "./pages/SigninPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/signin",
        element: <SigninPage />,
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
