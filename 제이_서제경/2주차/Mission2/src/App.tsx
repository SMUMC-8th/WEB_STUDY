import ThemeContent from "./components/ThemContent"; // 정확한 경로 확인
import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <NavBar />
      <div className="pt-16">
        <ThemeContent />
      </div>
    </ThemeProvider>
  );
}

export default App;