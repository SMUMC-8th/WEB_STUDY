import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "w-[50px] h-10 flex items-center justify-center rounded-md transition-all text-xl",
        {
          "bg-black text-white": !isLightMode,
          "bg-white text-black": isLightMode,
        }
      )}
    >
      {isLightMode ? "☾" : "☼"}
    </button>
  );
}
