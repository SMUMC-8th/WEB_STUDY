import NavBar from "../components/NavBar";
import ThemContent from "../components/ThemContent";
import { ThemeProvider } from "../context/ThemeProvider";

export default function ContextPage() {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <NavBar />
        <main className="flex-1 w-full">
          <ThemContent />
        </main>
      </div>
    </ThemeProvider>
  );
}
