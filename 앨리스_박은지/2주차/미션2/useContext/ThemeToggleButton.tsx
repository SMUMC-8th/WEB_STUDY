import { useTheme } from "./context/context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx("PX-4 PY-2 MT-4 rounded-md transition-all", {
        "bg-black text-white": !isLightMode,
        "bg-black text-black": !isLightMode,
      })}
    >
      {isLightMode ? "Dark Mode" : "Light Mode"}
    </button>
  );
}
