import { ThemeProvider } from "./useContext/ContextPage";
import ContextPage from "./useContext/ContextPage";
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <ContextPage />
    </ThemeProvider>
  );
}
