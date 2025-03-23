import { useTheme } from "./ThemeContext";

export default function ContextPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mode Change</h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </div>
  );
}
