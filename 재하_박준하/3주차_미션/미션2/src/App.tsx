import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import HomePage from "./pages/HomePage";
import Popular from "./pages/Popular";
import Upcoming from "./pages/Upcoming";
import TopRated from "./pages/TopRated";
import NowPlaying from "./pages/NowPlaying";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "popular",
        element: <Popular />,
      },
      {
        path: "nowplaying",
        element: <NowPlaying />,
      },
      {
        path: "toprated",
        element: <TopRated />,
      },
      {
        path: "upcoming",
        element: <Upcoming />,
      },
    ],
  },
]);

function App() {
  return (
    <main className="w-full h-screen flex flex-col">
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
