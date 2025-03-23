import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

export default function ThemContent() {
  const { theme } = useTheme();

  const isLightMode = theme === THEME.LIGHT;

  return (
    <div
      className={clsx(
        "p-4 h-dvh w-full",
        isLightMode ? "bg-white" : "bg-gray-800"
      )}
    >
      <h1
        className={clsx(
          "text-wxl font-bold",
          isLightMode ? "text-black" : "text-white"
        )}
      >
        ThemeContent
      </h1>
      <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
        mollitia, in fuga quidem libero ipsum accusamus adipisci tenetur et
        nihil eum est deserunt unde dolore earum cumque id neque aliquam.
      </p>
    </div>
  );
}
