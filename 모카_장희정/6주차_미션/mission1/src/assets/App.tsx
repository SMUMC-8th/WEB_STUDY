import './App.css';
import Homepage from './pages/Homepage';
import MoviePage from './pages/MoviePage';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage'

const router : Router =createBrowserRouter(routes:{

})

function App() {
  return (
    <div>
    <Homepage />   {/* ✅ 이렇게 써줘야 경고 사라짐 */}
  </div>
  );
}

export default App;
