import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

export default function NavBar() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <nav
      className={clsx(
        "h-16 px-6 w-full flex justify-between items-center fixed top-0 z-50 backdrop-blur shadow-md transition-colors duration-300",
        isLightMode ? "bg-white text-black" : "bg-gray-800 text-white"
      )}
    >
      <p className="text-lg font-bold tracking-wider">SMUMC</p>
      <ThemeToggleButton />
    </nav>
  );
}
