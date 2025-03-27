import TodolistPage from './pages/TodolistPage'
import { THEME, useTheme } from './context/ThemeProvider';

function App() {
  const {theme} = useTheme();

  return (
    <>
      <main
        className={theme === THEME.LIGHT
          ? "w-screen min-h-screen flex justify-center items-center bg-zinc-100"
          : "w-screen min-h-screen flex justify-center items-center bg-gray-600"}>
        <TodolistPage>
        </TodolistPage>
      </main>
    </>
  )
}


export default App;