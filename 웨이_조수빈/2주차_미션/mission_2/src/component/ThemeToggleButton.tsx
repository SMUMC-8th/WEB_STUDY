import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx("px-4 py-2 rounded-md mt-4 transition-all", {
        "bg-black text-white": !isLightMode,
        "bg-gray-200 text-black": isLightMode,
      })}
    >
      {isLightMode ? "다크 모드" : "라이트 모드"}
    </button>
  );
}

export default ThemeToggleButton;