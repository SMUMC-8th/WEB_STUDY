import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
// import router from './routes/routes';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';




const router = createBrowserRouter([
  {
    path : '/',
    element:<HomePage />,
    errorElement: <NotFoundPage />,
    children : [
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path :'movie/:movied',
        element : <MovieDetailPage />,
      },
    ],
  },
]);


function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
)
}

export default App