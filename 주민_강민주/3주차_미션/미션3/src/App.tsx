import router from './routes/routes'
import './App.css'
import { RouterProvider } from 'react-router-dom'

function App() {
  return (
  <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
