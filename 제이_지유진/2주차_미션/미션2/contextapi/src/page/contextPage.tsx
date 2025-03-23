import Navbar from "../component/Navbar";
import ThemeContent from "../component/ThemeContent";
import { ThemeProvider } from "../context/ThemeProvider";

function ContextPage() {
  return (
    <ThemeProvider>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Navbar />
        <main className="flex-1">
          <ThemeContent />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default ContextPage;
