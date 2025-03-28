import TodolistPage from './pages/TodolistPage'
import { THEME, useTheme } from './context/ThemeProvider';

function App() {
  const {theme} = useTheme();

  return (
    <>
      <main
        className={`w-screen min-h-screen flex justify-center items-center
          ${theme === THEME.LIGHT ? " bg-zinc-100" : " bg-gray-600"}`}>
        <TodolistPage>
        </TodolistPage>
      </main>
    </>
  )
}


export default App;